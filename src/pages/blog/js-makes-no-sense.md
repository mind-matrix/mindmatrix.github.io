---
layout: "../../layouts/BlogPost.astro"
title: JavaScript makes no sense. And that's awesome!
created: 2020-10-11
cover: https://res.cloudinary.com/mind-matrix/image/upload/v1602433296/wwjs_pp6lev.png
outline: true
description: Find out why JavaScript is often blamed by developers to make absolutely no sense and how we can exploit the weird way JS code behaves to create some interesting looking code.
---

JavaScript is an interesting language to say the least. For those of you living under a rock since the ice age, JavaScript (formally known as ECMAScript) is a lightweight scripting language developed primarily for the web and now finds usage across almost all domains of programming. It is weird in a dozen different ways. For starters, it a prototype-based programming language which forms the core of it's support for object-oriented programming paradigm. Sure, ES6 has the 'class', 'inteface' and other such syntactic sugars but the base remains the same. It is also one of the programming languages to support dynamic typing back when it wasn't cool. But what makes JS truely an oddity in the world of programming is it's support for **Type Coercion**. Type Coercion is, inherently, a weird thing. Adding that to the fact that JS has dynamic typing and such other additional weirdness, it makes for a great language for writing some out-of-this-world confusing code.

## Type Coercion

> Type coercion is the automatic or implicit conversion of values from one data type to another (such as strings to numbers).

As simple as it seems, Type Coercion can actually be both a very powerful tool for simplifying your code as well a curse to destroy your code's readability. Let us see some of the more obvious implications of this before we move on to the interesting ones. For example, the following expressions -

```js
> 4 + true
5
```

This is because `true` gets coerced into `1` and added to 4. Similarly -

```js
> '5' + 4
"54"
```

As is evident, `4` gets coerced into the string `'4'` by following the type coercion rules.

Now since this means that any type can be converted to any other type by mixing them into specific operations, we can get any type from any other type. One of the most common usages that lie on the border of weirdness but is used by many web developers is the double-negation operation which can convert numbers into booleans equivalent to their values -

```js
> !!5
true
> !!0
false
```

But what this also means is that the following are perfectly legal javascript expressions with perfectly legal results too -

```js
> {}+[]
0
> [+!+[]]+[+[]]
"10"
> (Number+"")[11]+([false]+undefined)[10]+(undefined+"")[1]+(undefined+"")[2]+(Number+"")[11]+(false+"")[1]+(true+"")[0]+(true+"")[1]+([false]+undefined)[10]+(+(101))["to"+String["name"]](34)[1]
"mindmatrix"
```

In fact, it has been demonstrated that any JS code can be re-written entirely in terms only 6 JS symbols. These symbols are `()+[]!`. This esoteric looking JS syntax is often referred to as the JSF*ck language. There is a great website that converts your regular old javascript into this weird looking language consisting entirely of just the 6 characters mentioned before. I have linked to the site in the last section so definitely check it out to be amazed.

## Arithmetic Operators

So we saw that combining strings and numbers results in strings. And just when you thought you have understood it all, you are bombed with this piece of code -

```js
> '5' + 1
"51"
> '5' - 1
4
```

So what happened? Why did the - operator behave differently than the + operator when subjected to the same operands? Well, it becomes clearer when you take a second look at the operators themselves. The meaning of + in this context as `concatenation` superseeds it's meaning as `addition` operation. However, in case of other arithmetic operators like -, /, * there is no such ambiguity to be resolved as the only supported operations between the types is of arithmetic nature.

## Tagged Template Literals

The traditional way to call functions is common among most programming languages. And JavaScript is no different in that regards. The mortal way to call functions are similar in JavaScript to most other major languages and goes as follows -

```js
> function x(y) { console.log(y); }
> x("abc")
abc
```

However, JavaScript being JavaScript had to have another pretty unusual alternative method to call functions. This unusual way of calling functions involves using backticks instead of parentheses to enclose the parameters to the function and goes as follows -

```js
> x`abc`
abc
```

Now the more curious of you might be wondering if it is possible to pass other types of arguments (that are not strings) and if it is possible to pass multiple arguments. And the answer is yes! Using the template and spread syntax.

```js
> function x(...args){ console.log(args[1] + args[2]); }
> x`${2}${3}`
5
```

Just note that the actual argument list for the function begins from index 1.

So these are some of the weird ways you can code in javascript. And like any powerful tool, JavaScript's freedom of expression can be interpreted as both a feature and a bug. For further reading, I have linked to various useful resources down below that you can check out at your leisure for more JS Awesomeness.

## Further Reading
1. [Type Coercion - MDN Docs](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)
2. [JavaScript to JSF*ck Converter](http://www.jsfuck.com/)