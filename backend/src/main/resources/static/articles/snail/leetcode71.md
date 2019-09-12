Given an absolute path for a file (Unix-style), simplify it. Or in other words, convert it to the canonical path.

In a UNIX-style file system, a period `.` refers to the current directory. Furthermore, a double period `..` moves the directory up a level. For more information, see: Absolute path vs relative path in Linux/Unix.

Note that the returned canonical path must always begin with a slash `/` , and there must be only a single slash `/` between two directory names. The last directory name(if it exists) must not end with a trailing `/`. Also, the canonical path must be the shortest string representing the absolute path.

Example 1:

```
Input: "/home/"
Output: "/home"
```

Example 2:

```
Input: "/../"
Output: "/"
```

Example 3:

```
Input: "/home//foo/"
Output: "/home/foo"
```

Example 4:

```
Input: "/a/./b/../../c/"
Output: "/c"
```

solution steps:

1. replace the ./

description: this step should be the last

2. replace the // 、///、////

```js
var str = "///..///";
var res = str.replace(/\/+/,'/');
console.log(res);
```

description: can't replace the string except the first substring.

```js
var str = "///..///";
var res = str.replace(/\/+/g,'/');
console.log(res);
```

3. look for the index of ..

```js
var index = /\.\./g.exec(str);
console.log(index);
```

description: can't look for all the places of ..



# JavaScript String substring() Method

string.substring(start, end)

start Required. The position where to start the extraction. First character is at index 0

end Optional. The position (up to, but not including) where to end the extraction. If omitted, it extracts the rest of the string

# Array.prototype.push()

```js
var animals = ['pigs', 'goats', 'sheep'];

console.log(animals.push('cows'));
// expected output: 4

console.log(animals);
// expected output: Array ["pigs", "goats", "sheep", "cows"]

animals.push('chickens');

console.log(animals);
// expected output: Array ["pigs", "goats", "sheep", "cows", "chickens"]
```

```js
// not finished
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    let len = path.length;
    let count = 0;
    let dp = new Array();
    let last = 0;
    if(len == 0)
        return "";
    let start; 
    for(let i = 0; i < len; i++) {
         if(path[i] == '/') {
             dp.push(path.substring(0, i+1));
             start = i+1;
             break;
         }
    }
    last = start;
    for(let i = start; i < len; i++) {
        if(path[i] == '/')
            count++;
        if(path[i] == '/') {
            let sTemp = path.substring(last+1, i);
            if(sTemp != "..")
            if(sTemp )
            last = i;
        }
    }
    console.log(count);
    return "/home";
};
```

# JavaScript String replace() Method

```js
var str = "Visit Microsoft!";
var res = str.replace("Microsoft", "W3Schools");
// Visit W3Schools
```

But it just replace the first searchstring.

# Regular Expressions

Regular expressins are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects. These patterns are used with the `exec` and `test` methods of `RegExp`, and with the `match`, `mathcAll`, `replace`, `search` , and `spilt` methods of `String`. This chapter describes JavaScript regular expressions.

## Creating a regular expression

You constuct a regular expression in one of two ways:

Using a regular expression literal, which consists of a pattern enclosed between slashes, as follows:

```js
var re = /ab+c/;
```

Regular expression literal provide compilation of the regular expression when the script is loaded. If the regular expression remains constant, using this can improve performance.

Or calling the constructor function of the `RegExp` object, as follows:

```js
var re = new RegExp('ab+c');
```

Using the constructor function provides runtime compilation of the regular expression. Use the constructor function when you know the regular expression pattern will be changing, or you don't know the pattern and are getting it from another source, such as user input.

## Writing a regular expression pattern

A regular expression pattern is composed of simple characters, such as `/abc/`, or a combination of simple and special characters, such as `/ab*c/` or `/Chapter (\d+)\.\d*/`. The last example includes parentheses which are used as a memory device. The match made with this part of the pattern is remembered for later use, as described in **Using parenthesized substring matches**.

### Using simple patterns

Simple patterns are constructed of characters for which you want to find a direct match. For example, the pattern `/abc/` matches character combinations in strings only when exactly the character `abc` occur together and in that order. Such a match would succeed in the strings "Hi, do you know your abc's?" and "The latest airplane designs evolved from slabcraft". In both cases the match is with substring `abc`. 

### Using special characters

When the search for a match requires something more than a direct match, such as finding one or more b's, or finding white space, you can include special characters in the pattern. For example, to match a single 'a' followed by zero or more 'b's followed 'c', you'd use the pattern `/ab*c/`: the `*` aftern 'b' means "0 or more occurrences of the preceding item". In the string 'cbbabbbbcdebc', the pattern matches the substring 'abbbbc'.

The following pages provide a complete list and description of the special characters that can be used in regular expressions.

### Assertions

Indicate in some way that a match is possible. Assertions include look-ahead, look-behind, and conditional expressions.

### Working with regular expressions 

Regular expressions are used with the `RegExp` methods `test` and `exec` and with the `String` methods `match` , `replace`, `search`, and `split`. These methods are explained in detail in the JavaScript reference.

**Methods that use regular expressions**

| **Method** | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| `exec`     | A  `RegExp` method that executes a search for a match in a string. It returns an array of imformation or null on a mismatch |
| `test`     | A `RegExp` method that tests for a match in a string. It returns true or false. |
| `match`    | A `String` method that excutes a search for a match in a string. It returns an array of information or null on a mismatch. |
| `matchAll` | A `String` method that returns an iterator containing all of the matches, including capturing groups. |
| `search`   | A `String` method that tests for a match in a string. It returns the index of the match, or -1 if the search fails. |
| `replace`  | A `String` method that excutes a search for a match in a string, and replaces the matched substring with a replacement substring. |
| `split`    | A `String` method that uses a regular expression or a fixed string to break a string into an array of substrings. |

When you want to know whether a pattern is found in a string, use the `test` or `search` method; for more imformation(but slower execution) use the `exec` or `match` methods. If you use `exec` or `match` and if the match succeeds, these methods return an array and update properties of the associated regular expression object and also of the predefined regular expression object, `RegExp`. If the match fails, the `exec` method returns `null`(which coerces tp `false`).

In the following example, the script uses the `exec` method to find a match in a string.

```js
var myRe = /d(b+)d/g;
var myArray = myRe.exec('cdbbdbsbz');
```

If you do not need to access the properties of the regular expression, an alternative way of creating `MyArray` is with this script:

```js
var myArray = /d(b+)d/g.exec('cdbbdbsbz'); 
    // similar to "cdbbdbsbz".match(/d(b+)d/g); however,
    // "cdbbdbsbz".match(/d(b+)d/g) outputs Array [ "dbbd" ], while 
    // /d(b+)d/g.exec('cdbbdbsbz') outputs Array [ 'dbbd', 'bb', index: 1, input: 'cdbbdbsbz' ].
```

If you want to construct the regular expression from a string, yet another alternative is this script:

```js
var myRe = new RegExp('d(b+)d', 'g');
var myArray = myRe.exec('cdbbdbsbz');
```

With these scripts, the match succeeds and returns the array and updates the properties shown in the following table:

| **Object** | Property or index | Description                                                  | In this example                                |
| ---------- | ----------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| `myArray`  |                   | The matched string and all remembered substrings.            | `['dbbd', 'bb', index: 1, input: 'cdbbdbsbz']` |
| `myArray`  | `index`           | The 0 - based index of the match in the input string.        | `1`                                            |
| `myArray`  | `input`           | The original string                                          | `"cdbbdbsbz"`                                  |
| `myArray`  | `[0]`             | The last matched characters.                                 | `"dbbd"`                                       |
| `myRe`     | `lastIndex`       | The index at which to start the next match. (This property is set only if the regular expression uses the g option, descripe in Advanced Searching With Flags). | `5`                                            |
| `myRe`     | `source`          | The text of the pattern. Updated at the time that the regular expression is created, not executed. | `"d(b+)d"`                                     |

As shown in the second form of this example, you can use a regular expression created with an object initializer without assigning it to a variable. If you do, however, every occurence is a new regular expression. For this reason, if you use this form without assigning it to variable, you cannot subsequently access the properties of that regular expression. For example, assume you have this script:

```js
var myRe = /d(b+)d/g;
var myArray = myRe.exec('cdbbdbsbz');
console.log('The value of lastIndex is ' + myRe.lastIndex);

// "The value of lastIndex is 5"
```

However, if you have this script:

```js
var myArray = /d(b+)d/g.exec('cdbbdbsbz');
console.log('The value of lastIndex is ' + /d(b+)d/g.lastIndex);

// "The value of lastIndex is 0"
```

The occurrences of `/d(b+)d/g` in the two statments are different regular e