<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'About the Name Freon', visible: false, ref: '#about-the-name-freon-1' },
		{ title: 'Previously known as ProjectIt', visible: false, ref: '#previously-known-as-projectit-2' },
		{ title: 'The Myth of Freon', visible: false, ref: '#the-myth-of-freon-3' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	import copy from 'copy-to-clipboard';
	import { onMount } from 'svelte';

	/**
	 * This function will go through all the 'pre' elements
	 * on the page and add a copy button to them.
	 * Thanks to: https://slavbasharov.com/blog/adding-click-to-copy-code-markdown-blog
	 */
	onMount(() => {
		const codeBlocks = document.querySelectorAll('pre');
		codeBlocks.forEach((block) => {
			const copyPrompt = document.createElement('div');
			copyPrompt.className = 'copy-prompt';
			const copyPromptText = document.createElement('p');
			copyPromptText.innerHTML = '👆 Click to copy';
			copyPromptText.className = 'copy-prompt-p';
			const copyIcon = document.createElement('img');
			copyIcon.src = '/icons/copy-icon.svg';
			copyIcon.className = 'copy-prompt-img';
			copyPrompt.appendChild(copyIcon);
			copyPrompt.appendChild(copyPromptText);
			block.appendChild(copyPrompt);
			block.querySelector('.copy-prompt > p').addEventListener('click', (evt) => {
				copy(block.querySelector('code').textContent);
				block.querySelector('.copy-prompt > p').innerHTML = 'Copied!';
				setTimeout(() => {
					block.querySelector('.copy-prompt > p').innerHTML = '👆 Click to copy';
				}, 1000);
			});
		});
	});
	import PrevNextSection from '$lib/prevNext/PrevNextSection.svelte';

	let prevLink = '/Background/Projectional_Editing';
	let nextLink = '/Background/About_the_Authors';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="about-the-name-freon-1" bind:intersecting={visible[0]}>About the Name <i>Freon</i></SectionComponent>
<p>About the origins of the name Freon…</p>
<SectionComponent tag="h2" id="previously-known-as-projectit-2" bind:intersecting={visible[1]}
	>Previously known as <i>ProjectIt</i></SectionComponent
>
<p>
	Freon started out as an experiment, trying to create a projectional editor for the web. At that time it was called <em>ProjectIt</em>.
	Because over the years the nature of the project has changed from a tool to create a projectional editor to a tool to create a DSL, the
	name has been changed to <em>‘Freon’</em>.
</p>
<p>
	The name <i>Freon</i> was chosen, simply because we like it, but also because it is the Frisian word for ‘friend’. We certainly want Freon
	to be a developer-, and user-friendly tool. There has been some discussion about how to pronounce Freon. A native Frisian speaker has been
	so kind to provide us with a sound bite. (Thanks, Meinte!)
</p>
<audio controls><source src="../../freon - pronunciation.mp3" type="audio/mpeg" />Your browser does not support the audio element.</audio>
<p>
	Besides that, we could not resist the temptation to invent yet another reason for this name. If you like, you can read all about the myth
	of the god of languages, who is, of course, named <em>Freon</em>.
</p>
<SectionComponent tag="h2" id="the-myth-of-freon-3" bind:intersecting={visible[2]}>The Myth of <i>Freon</i></SectionComponent>
<p>
	Once upon a time, gods and men lived together on this earth. As most gods used a body very similar to a human body, both species mingled
	very easily. Nor did they find any difficulty in communicating with each other, as they “talked” using psychic brain waves, sometimes
	accompanied by gestures or sounds. When, for instance, someone wanted to say: “look at that beautiful flower over there”, a pointing
	gesture would help to determine which flower was the subject of attention. Or when someone yelled out: “watch out for that crocodile”, a
	sound would express the fear and shock. Whatever form the communication would take, both humans and gods understood each other perfectly.
	It was in these times when the earth was young, that the story of Freon, the God of languages, began.
</p>
<p>
	Freon was a small God child. He had a very outgoing character, and befriended strangers with a natural ease and charm. (Or rather he still
	does, being a God he is of course eternal, and character is known to be highly adverse to change.) Being a curious child Freon was very
	interested in the sounds that were made when people were talking. He noticed that many people used the same sounds for expressing the same
	thing. For instance, the sound “oh” was often used when one was surprised, were “ah” was used in case of fatigue, and a longer “aaahh”
	accompanied pain. In his childlike playful way Freon started to invent sounds for certain expressions, and he and his friends used these
	instead of the psychic communication as their special, secret way of communicating.
</p>
<Figure imageName={'background/writing-child.png'} caption={'Is this Freon?'} figureNumber={1} />
<p>
	After a few ages, in which Freon grew up just a little but his human friends came and went, generation after generation, Freon had created
	many sounds. He even came up with a sound for the sounds that were made. He called his sounds “words”, and the sets of words he assembled,
	he called “languages”. With friends in one place he would use one “language”, with friends on the other side of earth, or in another time,
	he would use another.
</p>
<p>
	In a few heavenly moments, which took about three ages on earth, Freon’s father, the leader of the gods, noticed that the humans relied
	more and more on the sounds, and less on the psychic form of communication. In fact, the humans were losing the ability to understand each
	other without aid of sound or gestures all together. So Freon’s father told him to stop making “languages” and “for heaven’s sake speak
	normally from now on”. Freon reacted like the teenager he was at that time, telling his father not to act like an old demented human, and
	that he, Freon, would do exactly what he liked.
</p>
<p>
	When his father insisted, pulling rank - he was the leader of the gods, after all - Freon went to complain to his mother. Unfortunately
	for Freon, she agreed with his father. “Take pity on the humans”, she said, “they already suffered enough from the deluge. You remember,
	don’t you, Noah and his Arc. They have lost so much because of your father’s anger, don’t make them lose their ability to know and
	understand as well.” Of course Freon argued, but she was not to be persuaded. At the end of the day, Freon went away from the earth, out
	of time and space, back to his heavenly bedroom, pining.
</p>
<p>
	Freon was resentful, so he devised a plan to taunt his parents. In the next few weeks, (if you can call it weeks, outside of time) without
	his parents knowing, he went back to earth. This time (no pun intended, it’s simply difficult to communicate heavenly time to humans) he
	used his godly abilities to enter earth in a certain time and at a certain place. He went to places and times where he knew that his
	former human friends were, and he contacted them a few at a time. At every occasion he taught the group of humans a word to name the
	leader of the gods and his spouse. The genius of the plan was that he taught them a different name at every occasion. In one time and
	corner of the world, it was Zeus and Hera. In another it was Indra and Shachi, then Jupiter and Juno, and in the north it was Wodan and
	Frigg.
</p>
<p>
	Actually, the north was the first part of the earth that Freon visited, when he was still very angry with his parents. And the north
	winters being so cold and dark, the people had ot much else to do than listen to stories. In this particular winter Freon used more than a
	hundred different names for his father. All very good names, the name Fimbultyr, for instance, means “mighty god”. Freon never stooped to
	name-calling. But later Freon wondered if he might not have overdone things a bit.
</p>
<p>
	After a while, his mother noticed that Freon often left home secretly, had a word with him, and managed to get the whole story out of him.
	Internally smiling at her son’s mischief, she nevertheless grounded him for one heavenly month, that is thirty rest periods. Freon knew he
	couldn’t escape his mother’s attention, as she would be using her godly ability to know all he did, so he simply tried to rest as often as
	he could, thus getting the whole thing over as soon as possible.
</p>
<p>
	Meanwhile, on earth, people argued who was the top God. Some said Zeus, others Indra, others Wodan, and things soon became nasty. Blows
	were exchanged, brothers and sisters were no longer speaking with each, neighbours weren’t neighbourly no more. In a few ages - this all
	happened while Freon was grounded in his heavenly room - the whole world got out of control. There were so many disputes that finally the
	people of the town of Babel decided to ask the God himself by what name they should pray to him. Unfortunately, at that time the gods did
	not frequent the earth anymore, they had acquired a bit of a “been there, done that” kind of attitude. So how to contact the gods?
</p>
<p>
	Finally, the people of Babel decided to build a tower that would be high enough to reach the heavens. Unfortunately for them, Freon’s
	different languages had spread amongst them, ending in a huge misunderstanding between the builders. The foundation of the tower was not
	strong enough to take the weight of the building, and the whole thing collapsed. Many human lives were lost.
</p>
<Figure imageName={'background/tower-of-babel.png'} caption={'Tower of Babel'} figureNumber={2} />
<p>
	This disaster naturally was brought to the attention of Freon’s father. He sent out his ministers to investigate and when all of them in
	their reports mentioned Freon in one way or another, he called his son to his office. Freon knew that this was serious. The office was
	where important matters were dealt with, and Freon had never before been summoned there. The story doesn’t tell what was said exactly. His
	father and Freon agreed that it should better stay between them, and both have kept this agreement up to this day.
</p>
<p>
	However, since that day the leader of the gods called his son Freon, meaning <i>wise friend</i>. Because - as he explained later to his
	ministers - Freon needed to be reminded that being a god meant that he should be wise, at least wiser than a human, and that he should be
	a friend to the humans and help them along in their short lives. And in the ministerial council that followed, Freon was officially
	charged with helping humans overcome the misunderstanding that followed from the birth of the languages.
</p>
<p>And that is how Freon became the God of languages.</p>
<hr />
<p>(Author: Anneke Kleppe)</p>

<PrevNextSection {prevLink} {nextLink} />
