<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'The CourseSchedule Language', visible: false, ref: '#the-courseschedule-language-1' },
		{ title: 'The Freon Native Editor', visible: false, ref: '#the-freon-native-editor-2' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
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

	let prevLink = '/Examples/External_Components';
	let nextLink = '/Examples/External_Components/An_Icon_Component';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="the-courseschedule-language-1" bind:intersecting={visible[0]}>The CourseSchedule Language</SectionComponent>
<p>
	The CourseSchedule DSL revolves about the scheduling of training courses for adults. The main concepts are courses, rooms, and teachers,
	and there is a simplified notion of time. There are 10 time slots in a week, from Monday morning to Friday afternoon.
</p>
<p>The following is the metamodel, which by now you should be able to understand without problems.</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// CourseSchedule/phase1/defs/main.ast
</span>
language CourseSchedule

<span class="token keyword">model</span> <span class="token class-name">CourseSchedule</span> &#123;
    persons: <span class="token class-name">Staff</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    courses: <span class="token class-name">CourseCategory</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    rooms: <span class="token class-name">Building</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    schedule: <span class="token class-name">Schedule</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">Schedule</span> &#123;
    name: <span class="token builtin">identifier</span>;
    timeSlots: <span class="token class-name">Slot</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    file-extension = <span class="token string">"scd"</span>;     <span class="token comment">// the file extension used by the parser
</span>&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">Staff</span> &#123;
    name: <span class="token builtin">identifier</span>;
    teachers: <span class="token class-name">Person</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    file-extension = <span class="token string">"prs"</span>;     <span class="token comment">// the file extension used by the parser
</span>&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">CourseCategory</span> &#123;
    courses: <span class="token class-name">Course</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    file-extension = <span class="token string">"crs"</span>;     <span class="token comment">// the file extension used by the parser
</span>&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">Building</span> &#123;
    rooms: <span class="token class-name">Room</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    file-extension = <span class="token string">"bld"</span>;     <span class="token comment">// the file extension used by the parser
</span>&#125;

<span class="token comment">/* model unit Schedule */</span>
<span class="token keyword">concept</span> <span class="token class-name">Slot</span> &#123;
    time: <span class="token class-name">TimeStamp</span>;
    <span class="token keyword">reference</span> teacher: <span class="token class-name">Person</span>;
    <span class="token keyword">reference</span> room: <span class="token class-name">Room</span>;
    <span class="token keyword">reference</span> course: <span class="token class-name">Course</span>;
&#125;

<span class="token keyword">limited</span> <span class="token class-name">TimeStamp</span> &#123;
    day: <span class="token builtin">number</span>; <span class="token comment">// 1 = Monday, 2 = Tuesday, etc
</span>    part: <span class="token builtin">number</span>; <span class="token comment">// 1 indicates morning, 2 indicates afternoon
</span>    MondayMorning = &#123; day: <span class="token class-name">1</span>, part: <span class="token class-name">1</span> &#125;
    TuesdayMorning = &#123; day: <span class="token class-name">2</span>, part: <span class="token class-name">1</span> &#125;
    WednesdayMorning = &#123; day: <span class="token class-name">3</span>, part: <span class="token class-name">1</span> &#125;
    ThursdayMorning = &#123; day: <span class="token class-name">4</span>, part: <span class="token class-name">1</span> &#125;
    FridayMorning = &#123; day: <span class="token class-name">5</span>, part: <span class="token class-name">1</span> &#125;
    MondayAfternoon = &#123; day: <span class="token class-name">1</span>, part: <span class="token class-name">2</span> &#125;
    TuesdayAfternoon = &#123; day: <span class="token class-name">2</span>, part: <span class="token class-name">2</span> &#125;
    WednesdayAfternoon = &#123; day: <span class="token class-name">3</span>, part: <span class="token class-name">2</span> &#125;
    ThursdayAfternoon = &#123; day: <span class="token class-name">4</span>, part: <span class="token class-name">2</span> &#125;
    FridayAfternoon = &#123; day: <span class="token class-name">5</span>, part: <span class="token class-name">2</span> &#125;
&#125;

<span class="token comment">/* model unit Staff */</span>
<span class="token keyword">concept</span> <span class="token class-name">Person</span> &#123;
    name: <span class="token builtin">identifier</span>;
    fullName: <span class="token builtin">string</span>;
    phone: <span class="token builtin">number</span>;
    availability: <span class="token class-name">TimeStamp</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    <span class="token keyword">reference</span> competence: <span class="token class-name">Course</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token comment">/* model unit CourseCategory */</span>
<span class="token keyword">concept</span> <span class="token class-name">Course</span> &#123;
    name: <span class="token builtin">identifier</span>;
    description: <span class="token builtin">string</span>;
&#125;

<span class="token comment">/* model unit AllCourses */</span>
<span class="token keyword">concept</span> <span class="token class-name">Room</span> &#123;
    name: <span class="token builtin">identifier</span>;
    equipment: <span class="token builtin">string</span>;
&#125;
</code>`}</pre>
<SectionComponent tag="h2" id="the-freon-native-editor-2" bind:intersecting={visible[1]}>The Freon Native Editor</SectionComponent>
<p>
	As a first step we will create a native Freon editor, but we are not going to spend much effort on it. We will make the name and phone
	number information of a teacher into a fragment, put the list of competences of a teacher in a list of checkboxes, and clean up the rest a
	little bit.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// CourseSchedule/phase1/defs/main.edit
</span>
<span class="token keyword">editor</span> <span class="token keyword">default</span>

<span class="token class-name">global</span> &#123;
    <span class="token class-name">external</span> &#123;
        PersonIcon,
        PhoneButton,
        StaffAccordion,
        Schedule
    &#125;
&#125;

<span class="token comment">/* model unit Staff */</span>
<span class="token class-name">Staff</span> &#123;<span class="token punctuation">[</span>
Staff <span class="token keyword">in</span> the category: $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;

    $&#123;<span class="token function"><span class="token variable">self</span>.teachers</span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">Person</span> &#123;<span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token keyword">fragment</span> name<span class="token punctuation">]</span>
        Availability: $&#123;<span class="token function"><span class="token variable">self</span>.availability <span class="token keyword">checkbox</span></span>&#125; Competence: $&#123;<span class="token function"><span class="token variable">self</span>.competence</span>&#125;
<span class="token punctuation">]</span>
<span class="token keyword">fragment</span> name <span class="token punctuation">[</span>
Nickname: $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
Full Name: $&#123;<span class="token function"><span class="token variable">self</span>.fullName</span>&#125;
Phone <span class="token builtin">number</span>: $&#123;<span class="token function"><span class="token variable">self</span>.phone</span>&#125;
<span class="token punctuation">]</span>
&#125;

<span class="token comment">/* model unit CourseCategory */</span>
<span class="token class-name">CourseCategory</span> &#123;<span class="token punctuation">[</span>
Category: $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;

    $&#123;<span class="token function"><span class="token variable">self</span>.courses</span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token comment">/* model unit Schedule */</span>
<span class="token class-name">Schedule</span> &#123;<span class="token punctuation">[</span>
Schedule $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;

    $&#123;<span class="token function"><span class="token variable">self</span>.timeSlots</span>&#125;
<span class="token punctuation">]</span>&#125;
<span class="token class-name">Slot</span> &#123;<span class="token punctuation">[</span>
$&#123;<span class="token function"><span class="token variable">self</span>.time</span>&#125;
    Teacher: $&#123;<span class="token function"><span class="token variable">self</span>.teacher</span>&#125;
    Room:    $&#123;<span class="token function"><span class="token variable">self</span>.room</span>&#125;
    Course:  $&#123;<span class="token function"><span class="token variable">self</span>.course</span>&#125;
<span class="token punctuation">]</span>&#125;
</code>`}</pre>
<p>The editor for the staff model unit now looks like this.</p>
<Figure imageName={'examples/CourseSchedule/Screenshot-step1.png'} caption={'The native Freon editor'} figureNumber={1} />

<PrevNextSection {prevLink} {nextLink} />
