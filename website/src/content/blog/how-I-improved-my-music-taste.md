---
title: "how I improved my music taste"
pubDate: 2026-07-26
draft: true
---

I envy _playlist-people_. You know the binary divide. The group of people who carefully curate music playlists based on their mood, feelings, different 'eras' of their life, etc. They are the ones who scour Pinterest for cool album covers - some of them even have a theme, even more envy-inducing! - and write funny quips in their descriptions. I would even go as far to argue playlist curation can be seen as an art form.

I fall into the other camp. This is what I hit shuffle on when I want to listen to music:

![alt text](image.png)

2,662 liked songs, impressive huh? Anyways, this camp of people - that I am now going to generalize! - lack that drive. Perhaps they do want to, so desperately, jump fence onto the other side. The other side is cool (subjectively). But like any art form, it requires effort. And for me, requires overcoming perfectionism.

1. What if there's a song that is a perfect fit to this playlist that I **forget** to add before it falls out of my short-term memory?
2. What if I **forget** all the songs I have listened to? How do I have an archive of that?
3. What if I make **duplicate** playlists of the same vibe, and then have trouble **consolidating** later?
4. What is **important** enough to me to make an isolated playlist for it?
5. **What if I forget something?**

Notice a theme?

## The Symptom

Around a couple years ago, I realized something. The Spotify algorithm is not truly random (https://www.gadgetreview.com/the-shuffle-isnt-random-spotifys-patents-reveal-how-it-really-works). But I already kind of knew this. For some time, I remember feeling trapped. Like I was putting on headphones to have music drown out my environment -- this incessant drone of sound that never goes away. My real problem wasn't cultivating and curating the songs I already knew I liked, it was discovering more. _Experiencing_ more. And I didn't know the best way to do so.

So I created an album backlog [https://open.spotify.com/playlist/2HuXsZHbtqY5FkblLXmzDq?si=1cdb6b109e1c4e73]. Great! I solved it. Whenever I would feel like my music taste was getting stale and I wanted to switch it up, I would go into this playlist, pick an album I wanted to listen to, and listen to it. I'd add the songs I liked into my liked songs and boom!

I gave myself a lot of credit here. The problem was, the way I consume music is _not intentional_. This might be a bigger symptom to some other problem but that's a topic for another day. I don't usually feel like sitting down and listening to an album cover-to-cover. And I thought something was wrong with me, because that's what a lot of my friends - god bless the amount of social pressure I endured in first year - seemed to have no effort doing. And look how envious I was of their musical taste!

So, something had to change. I had to adjust this technique to better fit me. So, December 1, 2023 - where I clearly had much more important and pressing tasks to do - I decided to put my CS skills to the test. I created a simple Python script which would take a random album from my backlog, a random song from that album, and add it to a playlist. It would do so until a pre-determined time limit had been reached. Voila! I had made my first 'Weekly Mix 48' (https://open.spotify.com/playlist/6WIjr4CmWGlHG9DxIPT3NM?si=2af5dc7a16974422). And what a mix it was!

# insert bereal image and mix

I actually quite enjoyed this creation of mine. I'd scour the internet for cool albums to listen to. Every week, I'd come back to the script, run it, and watch it generate a new playlist for me. It was dopamine-inducing. The rush, and the enticing allure of what I would spend the rest of the week listening to, was enough to keep me coming back...

## until it wasn't

Of course, this process is very manual. Not to mention repeating. Two adjectives which perfectly describe the sort of things I usually tend to hyperfixate on for a while until I don't. So I had to do something better.

I used cronjobs (anacron ftw, [here's why]) to alleviate some of these concerns. With this setup, I think I rocked a solid year of weekly mixes. And man did my music taste change. People would compliment some of the songs I would play, recognizing some of the deep cuts I would pull up. To me, it was just the songs that I gravitated towards in the weekly mixes I had created for myself. It almost felt like getting all the reward for none of the labor-intensive work of curating my taste.

## Spotify Wrapped

I've had a couple of embarassing #1s. Kanye in 2022, Drake in 2023, Mitski in 2024, Fike in 2025 (I'm actually quite okay with the last two). But, something that irked me, the top 5 looked pretty similar year-upon-year. It was usually encumbant with some combination of Kendrick, Drake, Kanye, J. Cole. and whichever artist I actually did actively discover and listen to that year. I don't remember actively listening to more of these artists. What was happening?

Here's a distribution of artists in my liked songs.

# Insert image here

This was a classic example of the law of large numbers. The frequency distribution of the (not so but still kind of) random draws from this set of songs would, over lots of trials, end up resembling the frequency distribution of the whole i.e. this is why these guys keep sneaking into my wrapped.

I don't _not_ like all these songs anymore. Sure, this is a representation of the person I am trying to deviate from - to branch out into different musical tastes. But that's not to say I now objectively dislike the music I had once liked (though I do frequently filter this list whenever I happen upon a song I do not like -- it's not just a graveyard).

## The Final Product (skipping a few steps)

Basically, I realized the concern that I had could be resolved with this script. The script essentially became a hammer, and noticed quite a lot of nails lying around. I actually knew exactly how I wanted to consume music, it was just not in the most typical sense.

So, I created the notion of rolling playlists. Gone are the days of putting the mass liked songs into 'shuffle' (I lie, I still do this, just gone are the days of doing so automatically). I created a 1 and 3 month rolling playlist of my liked songs. These resemble the last 1 and 3 months of new additions into my liked songs.

On top of that, I realized my music taste was actually quite restricted to the albums I actively chose. There are quite a few songs I enjoy from these artists outside of these albums, and furthermore, I want some element of surprise. Like catch me off guard, oh glorious script, and recommend me some Joey Badass song from a random EP I never bothered to look at. So I changed my script to use the artists I follow and choose a random song from them. After a while, I realized I could apply this logic to the artists themselves as well, so I hooked up LastFM's API to my script to be able to find a couple of artists that were similar to the ones I have favourited, to give me some songs I truly would have never stumbled upon before.

It's been pretty freaking awesome. And one unintended consequence I realized from this, which might be the cherriest cherry on top. Now when I go back to my Liked Songs after continously only listening to the new weekly mixes and the rolling playlists, I get a sharp hit of nostalgia. Now that I don't treat that music like monotonous sound drowning out my life, every song reminds me of a very specific event. I literally recall from first principles how I feel about that song. If you know me, I am obsessed with memories. To be able to dive deep into a rabbit hole thanks to my hyperfocus tendencies, and, over the course of 3 years, shaping it to a workflow which, in and of itself, helps me recall my memroies and my past better. Man, I could not think of a more poetic ending to that December {X} procrastination of studying for the 223 final.
