function findIgnoreCaseAlgorithm(index, needle, onfound, onfinish) {

    // index: An instance of IDBIndex
    // needle: The string to search for
    // onfound: A function to call for each found item
    // onfinish: A function to call when we're finshed searching.

    var upperNeedle = needle.toUpperCase();
    var lowerNeedle = needle.toLowerCase();
    var cursorReq = index.openCursor();

    cursorReq.onsuccess = function (event) {
        var cursor = event.target.result;
        if (!cursor) {
            // No more data to iterate over - call onfinish()
            onfinish();
            return;
        }

        var key = cursor.key;
        if (typeof key !== 'string') {
            // Just in case we stumble on data that isnt what we expect -
            // toLowerCase() wont work on this object. Check next.
            cursor.continue();
            return;
        }

        var lowerKey = key.toLowerCase();
        if (lowerKey === lowerNeedle) {
            onfound(cursor.value); // Notify caller we found somethin
            cursor.continue(); // Check next record, it might match too!
        } else {
            // Derive least possible casing to appear after key in sort order
            var nextNeedle = nextCasing(key, lowerKey, upperNeedle, lowerNeedle);
            if (nextNeedle) {
                cursor.continue(nextNeedle);
            } else {
                // No more possible case combinations to look for.
                // Call onfinish() and dont call cursor.continue() anymore.
                onfinish();
            }
        }
    };
}

function nextCasing(key, lowerKey) {
    var length = Math.min(key.length, lowerNeedle.length); // lowerNeedle is from outer scope
    var llp = -1; // "llp = least lowerable position"

    // Iterate through the most common first chars for cursor.key and needle.
    for (var i = 0; i < length; ++i) {
        var lwrKeyChar = lowerKey[i];

        if (lwrKeyChar !== lowerNeedle[i]) {
            // The char at position i differs between the found key and needle being
            // looked for when just doing case insensitive match.
            // Now check how they differ and how to trace next casing from this:
            if (key[i] < upperNeedle[i]) {
                // We could just append the UPPER version of the key we're looking for
                // since found key is less than that.
                return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
            }

            if (key[i] < lowerNeedle[i]) {
                // Found key is between lower and upper version. Lets first append a
                // lowercase char and the rest as uppercase.
                return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
            }

            if (llp >= 0) {
                // Found key is beyond this key. Need to rewind to last lowerable
                // position and return key + 1 lowercase char + uppercase rest.
                return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
            }

            // There are no lowerable positions - all chars are already lowercase
            // (or non-lowerable chars such as space, periods etc)

            return null;
        }

        if (key[i] < lwrKeyChar) {
            // Making lowercase of this char would make it appear after key.
            // Therefore set llp = i.
            llp = i;
    }

    // All first common chars of found key and the key we're looking for are equal
    // when ignoring case.
    if (length < lowerNeedle.length) {
        // key was shorter than needle, meaning that we may look for key + UPPERCASE
        // version of the rest of needle.
        return key + upperNeedle.substr(key.length);
    }

    // Found key was longer than the key we're looking for
    if (llp < 0) {
        // ...and there is no way to make key we're looking for appear after found key.
        return null;
    } else {
        // There is a position of a char, that if we make that char lowercase,
        // needle will become greater than found key.
        return key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1);
    }
  }
}
