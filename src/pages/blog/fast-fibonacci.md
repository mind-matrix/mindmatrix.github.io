---
layout: "../../layouts/BlogPost.astro"
title: Faster Fibonacci
created: 2022-12-28
pubDate: "Aug 23, 2022"
description: Computing Fibonacci numbers in O(1) time with no extra space or pre-computed values.
---

**TL;DR** You can compute the n-th term of a fibonacci sequence using the lesser-known but very interesting, Binet's Formula. It goes by this -

The n-th term in a Fibonacci Sequence F(n) can be expressed as,

$ F(n) = \lfloor{ \frac{(\frac{1 + \sqrt{5}}{2}) ^ {n+1} - (\frac{1 - \sqrt{5}}{2}) ^ {n+1}}{\sqrt{5}} }\rfloor$

Here is an implementation of this formula in Python to find the n-th fibonacci number in O(1) time with no extra space or pre-computed values.

```py
import math

def fibo(n):
    return math.floor((math.pow((1 + math.sqrt(5))/2, n+1) - math.pow((1 - math.sqrt(5))/2, n+1))/math.sqrt(5))
```

## The origins of the Fibonacci Sequence

Fibonacci was not the first one to come up with the Fibonacci Series and infact, he never claimed he did either. Leonardo Bonacci (born c. 1170) was the son of an Italian customs official Guglielmo Bonacci. He only became popularly known as Fibonacci long after his death when in 1838, Franco-Italian historian Guillaume Libri decided Leonardo was an awefully overused name and decided to just record him as _fillius Bonacci_ (a.k.a the "son" of Bonacci). There was never any doubt that Leonardo was a very talented mathematician. However, his most notable contributions were not so much mathematical formulations but rather a historical account of the mathematical wonders he discovered on his travel accross the Mediterranean. He found that the Hindu-Arabic Numerals were far superior to the Roman Numeral System (they didn't even have a zero back then?) that was prevalent in Europe at the time. In his book, _Liber Abaci_ he introduced the famous Fibonacci Series to solve a theoretical problem involving Rabbits (which we will discuss later) as an example of what can be achieved using the Indo-Arabic Number System. The Sequence, however, was described as early as 200 B.C. by Indian poet Acharya Pingala on enumerating possible patterns of Sanskrit poetry formed from syllables of two lengths. He called the sequence by the name **mātrāmeru**.

## Fibonacci's Incestuous Rabbits

Sorry for the shocking title 😅. So Fibonacci described the Sequence as a solution the following problem -

Image there are 2 rabbits on a field - one male and one female.

1. A pair consists of one male and one female rabbit.

2. At the end of each month, a pair mates. The babies are not born for another one month (gestation period).

3. The babies are born at the end of the following month and also always consist of a pair - one male and one female - who may reproduce from the next month onwards.

Ignoring the horrid conditions under which these ignorant or vile (could be either) rabbits are reproducing, we can conclude the following pattern -

1. Let's call the first pair of rabbits Pair 1.

2. At the start (let's call it end of month 0), there's only Pair 1.

3. At the end of month 1, Pair 1 mates but there's no newborns. Now there are 1 pair(s) of rabbits.

4. At the end of month 2, Pair 1 produces Pair 2 and mates again. Now there are 2 pair(s) of rabbits.

5. At the end of month 3, Pair 1 produces another pair - let's call that Pair 3 - and mates yet again (by God are mommy and daddy busy!) and Pair 2 mates for the first time. Now there are 3 pair(s) of rabbits.

6. At the end of month 4, Pair 1 produces yet another pair named Pair 4 while Pair 2 also produces their first pair named Pair 5 and in other news, Pair 3 just mated (no babies yet). So now there are 5 pair(s) of rabbits on the field.

I assume you already see the pattern here. Under these conditions, the number of rabbits on the field at the end of month _n_ can be described as -

$ F_n = F_{n-1} + F_{n-2} $

which is, as you know, the famous Fibonacci Sequence.

## Pingala's Syllables

Let's try again with a less * ahem * graphic example. In the Sanskrit Prosody, there are 2 types of syllables distinguished by the duration it takes to utter the sounds -

1. The Long (L) syllable takes 2 units of time to speak

2. The Short (S) syllable takes 1 unit of time to speak

The question that Acharya Pingala asked is "How many was are there of composing an n-unit prosody using the Long (L) and Short (S) syllables?"

Let's work out a couple of these scenarios.

1. When n = 1, we have only 1 choice i.e., to use a single short syllable (S).

2. When n = 2, we can either go for (SS) or (L).

3. When n = 3, we can go for (SSS), (SL), (LS).

4. When n = 4, we can go for (SSSS), (SSL), (SLS), (LSS), (LL).

Already we see the fibonacci sequence emerge as the number of ways to compose an n-unit prosody using the Long and Short syllables which can be described as -

$ F_n = F_{n-1} + F_{n-2}$

This was first described by Pingala in 200 B.C. in his formulation of the solution titled *misrau cha*.

## Gold-bonacci (Fibonacci and the Golden Ratio)

We have seen how we can describe the Fibonacci Sequence as a relation between it's consecutive terms. But let us explore this idea further and see if we can come up with some sort of statistic that enables us to make more interesting conclusions about the Fibonacci numbers. In the table below I have listed out the n-th fibonacci number $F_n$ and it's ratio with the previous number $F_{n-1}$ for n=1,2,...10.

| n   | $F_n$ | $\frac{F_n}{F_{n-1}}$ |
| --- | ----- | --------------------- |
| 1   | 1     | 1.0                   |
| 2   | 2     | 2.0                   |
| 3   | 3     | 1.5                   |
| 4   | 5     | 1.6667                |
| 5   | 8     | 1.6                   |
| 6   | 13    | 1.625                 |
| 7   | 21    | 1.6154                |
| 8   | 34    | 1.6190                |
| 9   | 55    | 1.6176                |
| 10  | 89    | 1.6181                |

You might be able to see that the value of the ratio seems to be converging towards a certain number between 1.61 and 1.62. We will not go into the rigorous mathematical details to prove it in this post since it is written by me who is by no means a reliable source for mathematical proofs (I'd much rather leave it to the pros - links towards the bottom of the article). But for those of you who are still unconvinced, we can observe a plot of the ratio $ \frac{F_n}{F_{n-1}} $ for n=1 to 500 (that seems reasonable I hope). Convinced yet?

![](data:image/png;base64,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)

In fact, it turns out that if we take the limit of this ratio to infinity, it equates to the **Golden Ratio**.

$\lim_{n \to \infty}\frac{F_n}{F_{n-1}} = \varphi$

---

#### FACTBYTE

The Golden ratio is the ratio of two terms $t_1$ and $t_2$ such that,

$\frac{\max(t_1,t2)}{\min(t_1,t_2)} = \frac{t_1+t_2}{\max(t_1,t_2)}$ and is denoted as $\varphi$.

Let us suppose $t_2 \gt t_1$. Then,

$\varphi = \frac{t_2}{t_1} = \frac{t_1+t_2}{t_2} \implies \frac{t_2}{t_1} = \frac{t_1}{t_2}+\frac{t_2}{t_2} \implies \frac{t_2}{t_1} = \frac{t_1}{t_2}+1 \implies \frac{t_2}{t_1} = 1 + \frac{1}{\frac{t_1}{t_2}}$

Substituting $\frac{t_2}{t_1}$ with $\varphi$,

$\varphi = 1+\frac{1}{\varphi} \implies \varphi^2-\varphi-1 = 0 \implies \varphi = \frac{1 + \sqrt{5}}{2},\frac{1 - \sqrt{5}}{2}$

If we label $\frac{1 + \sqrt{5}}{2}$ as $\varphi$ then $\frac{1 - \sqrt{5}}{2}$ becomes $\frac{1}{\varphi}$ and vice-versa. We will use the former notation in this article.

---

The interesting property of the 2 solutions to $\varphi$ is that,

$ \frac{\varphi - \frac{1}{\varphi}}{\sqrt{5}} = \frac{\frac{1 + \sqrt{5}}{2} - \frac{1 - \sqrt{5}}{2}}{\sqrt{5}} = 1$

And also,

$\frac{\varphi ^ 2 - \frac{1}{\varphi} ^ 2}{\sqrt{5}} = \frac{(\frac{1 + \sqrt{5}}{2}) ^ 2 - (\frac{1 - \sqrt{5}}{2}) ^ 2}{\sqrt{5}} = 2$

And also,

$\frac{\varphi ^ 3 - \frac{1}{\varphi} ^ 3}{\sqrt{5}} = \frac{(\frac{1 + \sqrt{5}}{2}) ^ 3 - (\frac{1 - \sqrt{5}}{2}) ^ 3}{\sqrt{5}} = 3$

And also,

$\frac{\varphi ^ 4 - \frac{1}{\varphi} ^ 4}{\sqrt{5}} = \frac{(\frac{1 + \sqrt{5}}{2}) ^ 4 - (\frac{1 - \sqrt{5}}{2}) ^ 4}{\sqrt{5}} = 5$

And also I'm dragging it on for too long because we can clearly observe the pattern here. It can be proved (again, not gonna do it here - links at the bottom of the article) that,

$F_{n} \ge \frac{\varphi ^ {n+1} - \frac{1}{\varphi} ^ {n+1}}{\sqrt{5}} = \frac{(\frac{1 + \sqrt{5}}{2}) ^ {n+1} - (\frac{1 - \sqrt{5}}{2}) ^ {n+1}}{\sqrt{5}} \gt F_{n-1}$

which means,

$F_{n} = \lfloor{ \frac{(\frac{1 + \sqrt{5}}{2}) ^ {n+1} - (\frac{1 - \sqrt{5}}{2}) ^ {n+1}}{\sqrt{5}} }\rfloor$

where $F_n$ is the n-th Fibonacci number (starting from n=0, since we are computer-folks 😁). This formula is also know as **Binet's Formula**.

## What did it cost?

Everything. It cost everything less than if we computed it by recursion or any other such method. Recall that for the recursive solution to Fibonacci, the program needs to maintain a stack of the recursive calls in memory which not only consumes space but also takes time (to copy values to the stack). On the other hand, using Binet's Formula, we can compute the same number in constant time O(1) and the implementation should be pretty straightforward in any language supporting basic maths.

## References for N.E.R.D.S

[Golden ratio - Wikipedia](https://en.wikipedia.org/wiki/Golden_ratio)

[Fibonacci number - Wikipedia](https://en.wikipedia.org/wiki/Fibonacci_number)

[The "Fibonacci" Sequence Was Actually Discovered In India 1000 Years Earlier - YouTube](https://www.youtube.com/watch?v=gTQeVlDsAi0)

[A Proof of Binet's Formula (milefoot.com)](http://www.milefoot.com/math/discrete/sequences/binetformula.htm#:~:text=The%20explicit%20formula%20for%20the,the%20first%20to%20use%20it.)


