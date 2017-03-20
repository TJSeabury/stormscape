// Function: setCookie
// Purpose: create a cookie associated with the current webpage
// Parameters:
//   name - the name of the cookie
//   value - the value associated with the name
//   numDaysBeforeExpiry (optional) - the number of days that the
//     cookie is valid for.  Specifying a negative number
//     will result in the cookie being deleted.
//   path - the path to specify in the cookie
// Returns: nothing
// Assumptions:
//   name and value have not been escaped yet
//   If numDaysBeforeExpiry is not specified, or has a value of 0,
//     the cookie is to be a session cookie

function setCookie( name, value, numDaysBeforeExpiry, path ) {
    // cookie is the string used to specify the cookie
    var cookie;
    
    // expiryDate is the date when the cookie is to expire
    var expiryDate;
    
    // Escape both the name and value and add them to the cookie
    cookie = encodeURIComponent( name ) + "=" +
             encodeURIComponent( value );
            
    // If an expiration date has been specified and it's not zero
    if ( ( numDaysBeforeExpiry !== undefined ) &&
         ( numDaysBeforeExpiry !== 0 ) ) {
        // Calculate the expiry date
        expiryDate = new Date();
        expiryDate.setDate( expiryDate.getDate() + numDaysBeforeExpiry );
        
        // Add the expiry date on to the cookie
        cookie += "; expires=" + expiryDate.toUTCString();
    }
    
    // If a path has been specified
    if ( path !== undefined ) {
        // Add the path on to the cookie
        cookie += "; path=" + path;
    }
    
    // Set the cookie
    document.cookie = cookie;
}


// Function: readCookie
// Purpose: Return the cookie value associated with the specified name,
//   or undefined if no matching value is found
// Parameters:
//   name - the name to obtain the value for
// Returns: the cookie value associated with the specified name, or undefined if
//   no cookie name exists
// Assumptions:
//   name has not been URI encoded

function readCookie( name ) {
    // value contains the cookie value
    var value;
    
    // cookieString is the string containing all cookies for this page
    // We add a semi-colon to the end to make the searching easier
    var cookieString = document.cookie + ";";
    
    // Build a regular expression that searches for this cookie
    var regExp = new RegExp( encodeURIComponent( name ) + "=(.*?);" );
    
    // result contains the result of applying the regular expression
    var result = regExp.exec( cookieString );
    
    // If match was found
    if ( ( result !== null ) && ( result.length === 2 ) ) {
        // The value is the matched subexpression
        value = result[1];
    }

    // Return the value
    return value === undefined ? value : decodeURIComponent( value );
}