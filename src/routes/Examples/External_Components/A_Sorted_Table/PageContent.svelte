<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'A Sorted Table', visible: false, ref: '#a-sorted-table-1' },
		{ title: 'Step 1: Create the Svelte Component', visible: false, ref: '#step-1-create-the-svelte-component-2' },
		{ title: 'Step 2: Include in the Projection', visible: false, ref: '#step-2-include-in-the-projection-3' },
		{ title: 'Final Result', visible: false, ref: '#final-result-4' },
		{ title: 'Conclusion', visible: false, ref: '#conclusion-5' },
		{ title: 'The Complete Svelte Component', visible: false, ref: '#the-complete-svelte-component-6' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	$: $mySections[3].visible = visible[3];
	$: $mySections[4].visible = visible[4];
	$: $mySections[5].visible = visible[5];
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

	let prevLink = '/Examples/External_Components/Replacing_a_Part_List';
	let nextLink = '/Demo';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="a-sorted-table-1" bind:intersecting={visible[0]}>A Sorted Table</SectionComponent>
<p>
	The native Freon Table takes a list of nodes of the same type, and displays the properties of those nodes each in a column or row. But
	what if you want something completely different? In this example we are going to sort the list of time slots in a schedule based on the
	time stamp in each slot, before we display the schedule.
</p>
<p>As a reminder, here are the AST definitions of Schedule, Slot and TimeSlot.</p>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase5/defs/main.ast#L10-L14</span>

modelunit Schedule <span class="token punctuation">&#123;</span>
    name<span class="token operator">:</span> identifier<span class="token punctuation">;</span>
    timeSlots<span class="token operator">:</span> Slot<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    file<span class="token operator">-</span>extension <span class="token operator">=</span> <span class="token string">"scd"</span><span class="token punctuation">;</span>     <span class="token comment">// the file extension used by the parser</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase5/defs/main.ast#L33-L53</span>

concept Slot <span class="token punctuation">&#123;</span>
    time<span class="token operator">:</span> TimeStamp<span class="token punctuation">;</span>
    reference teacher<span class="token operator">:</span> Person<span class="token punctuation">;</span>
    reference room<span class="token operator">:</span> Room<span class="token punctuation">;</span>
    reference course<span class="token operator">:</span> Course<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

limited TimeStamp <span class="token punctuation">&#123;</span>
    day<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// 1 = Monday, 2 = Tuesday, etc</span>
    part<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// 1 indicates morning, 2 indicates afternoon</span>
    MondayMorning <span class="token operator">=</span> <span class="token punctuation">&#123;</span> day<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> part<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">&#125;</span>
    TuesdayMorning <span class="token operator">=</span> <span class="token punctuation">&#123;</span> day<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> part<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">&#125;</span>
    WednesdayMorning <span class="token operator">=</span> <span class="token punctuation">&#123;</span> day<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> part<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">&#125;</span>
    ThursdayMorning <span class="token operator">=</span> <span class="token punctuation">&#123;</span> day<span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span> part<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">&#125;</span>
    FridayMorning <span class="token operator">=</span> <span class="token punctuation">&#123;</span> day<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> part<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">&#125;</span>
    MondayAfternoon <span class="token operator">=</span> <span class="token punctuation">&#123;</span> day<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> part<span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">&#125;</span>
    TuesdayAfternoon <span class="token operator">=</span> <span class="token punctuation">&#123;</span> day<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> part<span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">&#125;</span>
    WednesdayAfternoon <span class="token operator">=</span> <span class="token punctuation">&#123;</span> day<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> part<span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">&#125;</span>
    ThursdayAfternoon <span class="token operator">=</span> <span class="token punctuation">&#123;</span> day<span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span> part<span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">&#125;</span>
    FridayAfternoon <span class="token operator">=</span> <span class="token punctuation">&#123;</span> day<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> part<span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="step-1-create-the-svelte-component-2" bind:intersecting={visible[1]}
	>Step 1: Create the Svelte Component</SectionComponent
>
<p>
	To create a dynamic schedule table, we will define a Svelte component named <code>Schedule.svelte</code>. This component will handle the
	sorting of time slots, display the sorted list, and allow the user to add new slots.
</p>
<h3 id="the-script-section-1">The Script Section</h3>
<p>
	The box type that we are using is an <code>ExternalPartListBox</code>. The four mandatory functions are similar to the ones in the
	StaffAccordion component, with one exception, which we will explain later on. The key to sorting the schedule lies in the
	<code>initialize()</code>
	function, which processes the list of <code>timeSlots</code>
	and sorts them based on the <code>TimeStamp</code>. While sorting the list, in order to later render the correct box for each
	<code>Slot</code>, we remember which child box is associated with a <code>Slot</code> in the variable <code>slotToBoxMap</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase5/src/external/Schedule.svelte#L56-L156</span>

<span class="token keyword">function</span> <span class="token function">sortSlots</span><span class="token punctuation">(</span>startVal<span class="token operator">:</span> Slot<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        sortedSlots<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token punctuation">(</span>startVal<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> index<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// remember which box belongs to which slot</span>
        slotToBoxMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> box<span class="token punctuation">.</span>children<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>$time<span class="token punctuation">.</span>day<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>$time<span class="token punctuation">.</span>part<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Monday morning</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Monday afternoon</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#125;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
            <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>$time<span class="token punctuation">.</span>part<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Tuesday morning</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Tuesday afternoon</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#125;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
            <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>$time<span class="token punctuation">.</span>part<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Wednesday morning</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Wednesday afternoon</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#125;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
            <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>$time<span class="token punctuation">.</span>part<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Thursday morning</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Thursday afternoon</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#125;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
            <span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>$time<span class="token punctuation">.</span>part<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Friday morning</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Friday afternoon</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                        sortedSlots<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#125;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/* Sort the list of slots based on the time */</span>
<span class="token keyword">function</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">let</span> startVal<span class="token operator">:</span> FreNode<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> box<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">!</span>startVal <span class="token operator">&amp;&amp;</span> box<span class="token punctuation">.</span><span class="token function">getPropertyType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">"Slot"</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// cast the startVal to the expected type, in this case "Slot[]".</span>
        <span class="token comment">// sort the slots based on the time and remember which box belongs to which slot</span>
        <span class="token function">sortSlots</span><span class="token punctuation">(</span>startVal <span class="token keyword">as</span> Slot<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	The function that adds a new <code>Slot</code> takes a parameter of type <code>TimeStamp</code>. This enables us to create a new slot with
	the given time stamp. We did not bother with creating the function to remove a <code>Slot</code>. It would be similar to the one in the
	<code>StaffAccordion</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase5/src/external/Schedule.svelte#L158-L165</span>

<span class="token keyword">const</span> <span class="token function-variable function">addSlot</span> <span class="token operator">=</span> <span class="token punctuation">(</span>timeStamp<span class="token operator">:</span> TimeStamp<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// Note that you need to put any changes to the actual model in a 'AST.change' or 'AST.changeNamed',</span>
    <span class="token comment">// because all elements in the model are reactive using mobx.</span>
    <span class="token constant">AST</span><span class="token punctuation">.</span><span class="token function">change</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">let</span> newSlot<span class="token operator">:</span> Slot <span class="token operator">=</span> Slot<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>time<span class="token operator">:</span> FreNodeReference<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">create</span><span class="token generic class-name"><span class="token operator">&lt;</span>TimeStamp<span class="token operator">></span></span></span><span class="token punctuation">(</span>timeStamp<span class="token punctuation">,</span> <span class="token string">"TimeStamp"</span><span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        box<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>newSlot<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>Then there are two variables that make live easier in the HTML part.</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase5/src/external/Schedule.svelte#L40-L54</span>

<span class="token keyword">let</span> dayTitle<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'Monday'</span><span class="token punctuation">,</span> <span class="token string">'Tuesday'</span><span class="token punctuation">,</span> <span class="token string">'Wednesday'</span><span class="token punctuation">,</span> <span class="token string">'Thursday'</span><span class="token punctuation">,</span> <span class="token string">'Friday'</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// variables for creating a new slot</span>
<span class="token keyword">let</span> timeStamps<span class="token operator">:</span> TimeStamp<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    TimeStamp<span class="token punctuation">.</span>MondayMorning<span class="token punctuation">,</span>
    TimeStamp<span class="token punctuation">.</span>TuesdayMorning<span class="token punctuation">,</span>
    TimeStamp<span class="token punctuation">.</span>WednesdayMorning<span class="token punctuation">,</span>
    TimeStamp<span class="token punctuation">.</span>ThursdayMorning<span class="token punctuation">,</span>
    TimeStamp<span class="token punctuation">.</span>FridayMorning<span class="token punctuation">,</span>
    TimeStamp<span class="token punctuation">.</span>MondayAfternoon<span class="token punctuation">,</span>
    TimeStamp<span class="token punctuation">.</span>TuesdayAfternoon<span class="token punctuation">,</span>
    TimeStamp<span class="token punctuation">.</span>WednesdayAfternoon<span class="token punctuation">,</span>
    TimeStamp<span class="token punctuation">.</span>ThursdayAfternoon<span class="token punctuation">,</span>
    TimeStamp<span class="token punctuation">.</span>FridayAfternoon
<span class="token punctuation">]</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="the-html-section-2">The HTML Section</h3>
<p>
	Unfortunately, we could not use the <code>Table</code> component from the SMUI library, because it cuts off its content, including any dropdown
	menu. But with a little bit of extra CSS styling we have recreated the table in plain HTML.
</p>
<p>
	Have a look at the headers first, each of which hold the name of a day. Because, on the other axis, we want to display headers with the
	texts <code>Morning</code> and <code>Afternoon</code>, the first header cell is left empty.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase5/src/external/Schedule.svelte#L174-L179</span>

<span class="token operator">&lt;</span>tr <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-header-row"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>th <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-header-cell"</span><span class="token operator">></span><span class="token operator">--</span><span class="token operator">&lt;</span><span class="token operator">/</span>th<span class="token operator">></span>
    <span class="token punctuation">&#123;</span>#each dayTitle <span class="token keyword">as</span> title<span class="token punctuation">&#125;</span>
        <span class="token operator">&lt;</span>th <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-header-cell"</span><span class="token operator">></span><span class="token punctuation">&#123;</span>title<span class="token punctuation">&#125;</span><span class="token operator">&lt;</span><span class="token operator">/</span>th<span class="token operator">></span>
    <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>tr<span class="token operator">></span></code>`}</pre>
<p>
	Next, we create two rows, one for the mornings and one for the afternoons. Let’s take a look at the first row. The first cell is the row
	header showing the text <code>Morning</code>. Then we loop over the sorted slots, but we take only the first five, because these represent
	the five mornings. Note that each morning can hold a list of slots. If there are slots for a certain morning then for each of those we get
	the associated box using the <code>slotToBoxMap</code> variable, and we render them using the Freon <code>RenderComponent</code>. We add
	some <code>divs</code> to the lot to be able to style everything. The row for the afternoons is almost identical, but takes the last five of
	the sorted slots.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase5/src/external/Schedule.svelte#L182-L203</span>

<span class="token operator">&lt;</span>tr <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-row"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-header-cell"</span><span class="token operator">></span>Morning<span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
    <span class="token punctuation">&#123;</span>#each sortedSlots  <span class="token keyword">as</span> slots<span class="token punctuation">,</span> index<span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#123;</span>#<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#123;</span>#<span class="token keyword">if</span> slots<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">&#125;</span>
                <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-cell"</span><span class="token operator">></span>
                    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-cell-content"</span><span class="token operator">></span>
                        <span class="token punctuation">&#123;</span>#each slots <span class="token keyword">as</span> slot<span class="token punctuation">&#125;</span>
                            <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-slot-render"</span><span class="token operator">></span>
                                <span class="token operator">&lt;</span>RenderComponent box<span class="token operator">=</span><span class="token punctuation">&#123;</span>slotToBoxMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">&#125;</span> editor<span class="token operator">=</span><span class="token punctuation">&#123;</span>editor<span class="token punctuation">&#125;</span> <span class="token operator">/</span><span class="token operator">></span>
                            <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                        <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
            <span class="token punctuation">&#123;</span><span class="token operator">:</span><span class="token keyword">else</span><span class="token punctuation">&#125;</span>
                <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-cell"</span><span class="token operator">></span>
                    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-slot-render"</span><span class="token operator">></span><span class="token constant">NONE</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
            <span class="token punctuation">&#123;</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#123;</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>tr<span class="token operator">></span></code>`}</pre>
<p>
	In between we have added two rows containing buttons to enable the user to add a slot to a specific time. Again, the first cell is left
	empty, because that is the column with the headers. Then, looping over the
	<code>timeStamp</code> list, we add a cell with a button that takes the element from the <code>timeStamp</code> list as a parameter to the
	function that adds a slot.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase5/src/external/Schedule.svelte#L204-L213</span>

<span class="token operator">&lt;</span>tr<span class="token operator">></span>
    <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-btn-cell"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
    <span class="token punctuation">&#123;</span>#each timeStamps <span class="token keyword">as</span> stamp<span class="token punctuation">,</span> index<span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#123;</span>#<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">&#125;</span>
            <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-btn-cell"</span><span class="token operator">></span>
                <span class="token operator">&lt;</span>IconButton <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"material-icons"</span> on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">addSlot</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token operator">></span>add<span class="token operator">&lt;</span><span class="token operator">/</span>IconButton<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
        <span class="token punctuation">&#123;</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>tr<span class="token operator">></span></code>`}</pre>
<p>The complete Svelte component can be found at the bottom of this page.</p>
<SectionComponent tag="h2" id="step-2-include-in-the-projection-3" bind:intersecting={visible[2]}
	>Step 2: Include in the Projection</SectionComponent
>
<p>
	We include the new component in the projection with the text <code>replace=Schedule</code>. Furthermore, because the table already makes
	clear what the time stamp of each slot is, we adjust the projection for the <code>Slot</code> itself to not show
	<code>$&#123;self.time&#125;</code>.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// CourseSchedule/phase5/defs/externals.edit#L20-L31
</span>
<span class="token class-name">Schedule</span> &#123;<span class="token punctuation">[</span>
Schedule $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;

$&#123;<span class="token variable">self</span>.timeSlots <span class="token keyword">replace</span>=Schedule&#125;

<span class="token punctuation">]</span>&#125;

<span class="token class-name">Slot</span> &#123;<span class="token punctuation">[</span>
    Teacher: $&#123;<span class="token function"><span class="token variable">self</span>.teacher</span>&#125;
    Room:    $&#123;<span class="token function"><span class="token variable">self</span>.room</span>&#125;
    Course:  $&#123;<span class="token function"><span class="token variable">self</span>.course</span>&#125;
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<p>By now, you will have understood the admin that needs to be done for the external component, so we won’t bother with that here.</p>
<SectionComponent tag="h2" id="final-result-4" bind:intersecting={visible[3]}>Final Result</SectionComponent>
<p>When all is done, the editor should look like this. Rather neat! At least, we like it, and hope you do as well.</p>
<Figure imageName={'examples/CourseSchedule/Screenshot-step5.png'} caption={'Editor with sorted table showing Slots'} figureNumber={1} />
<SectionComponent tag="h2" id="conclusion-5" bind:intersecting={visible[4]}>Conclusion</SectionComponent>
<p>
	Once you’ve followed these steps, you will have a fully functional Svelte component that displays a sorted table for your time slots. This
	solution can be adapted to various use cases where you need to manage and display structured data in a table format. The editor will show
	the schedule neatly sorted by day and time, allowing users to interact with the schedule and add new time slots.
</p>
<p>
	This extended example demonstrates how integrating custom Svelte components into the Freon editor unlocks limitless possibilities for
	creating unique designs and functionalities. We’re confident that, after following this example, you’ll be well-equipped to utilize any of
	the <a href="/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types">External Component Box Types</a>
	offered by Freon.
</p>
<p>
	Since external components are still in the experimental stage, we are eager to learn how you plan to use them. If you decide to
	incorporate external components, please reach out to the Freon team. You can contact us via email at info AT freon4dsl.dev or through
	GitHub. We would love to hear from you and are happy to provide any assistance you need.
</p>
<SectionComponent tag="h2" id="the-complete-svelte-component-6" bind:intersecting={visible[5]}
	>The Complete Svelte Component</SectionComponent
>
<p>For reference, here is the full implementation of the <code>Schedule.svelte</code> component:</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase5/src/external/Schedule.svelte</span>

<span class="token operator">&lt;</span>script lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span>
    <span class="token keyword">import</span> IconButton <span class="token keyword">from</span> <span class="token string">"@smui/icon-button"</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>afterUpdate<span class="token punctuation">,</span> onMount<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"svelte"</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>Box<span class="token punctuation">,</span> ExternalPartListBox<span class="token punctuation">,</span> FreEditor<span class="token punctuation">,</span> FreNode<span class="token punctuation">,</span> FreNodeReference<span class="token punctuation">,</span> <span class="token constant">AST</span><span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>RenderComponent<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core-svelte"</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>Slot<span class="token punctuation">,</span> TimeStamp<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../freon/language/gen/index.js"</span><span class="token punctuation">;</span>

    <span class="token comment">// This component replaces the component for "timeSlots: Slot[];" from model unit "Schedule".</span>
    <span class="token comment">// This property is a parts list, therefore the external box to use is an ExternalPartListBox.</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> box<span class="token operator">:</span> ExternalPartListBox<span class="token punctuation">;</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">;</span>

    <span class="token comment">// The following four functions need to be included for the editor to function properly.</span>
    <span class="token comment">// Please, set the focus to the first editable/selectable element in this component.</span>
    <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">setFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">const</span> refresh <span class="token operator">=</span> <span class="token punctuation">(</span>why<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// do whatever needs to be done to refresh the elements that show information from the model</span>
        <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
    <span class="token function">onMount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        box<span class="token punctuation">.</span>setFocus <span class="token operator">=</span> setFocus<span class="token punctuation">;</span>
        box<span class="token punctuation">.</span>refreshComponent <span class="token operator">=</span> refresh<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">afterUpdate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sortedSlots <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>sortedSlots<span class="token punctuation">]</span>
        box<span class="token punctuation">.</span>setFocus <span class="token operator">=</span> setFocus<span class="token punctuation">;</span>
        box<span class="token punctuation">.</span>refreshComponent <span class="token operator">=</span> refresh<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// --------------------------- //</span>
    <span class="token keyword">let</span> slotToBoxMap<span class="token operator">:</span> Map<span class="token operator">&lt;</span>Slot<span class="token punctuation">,</span> Box<span class="token operator">></span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map<span class="token operator">&lt;</span>Slot<span class="token punctuation">,</span> Box<span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> sortedSlots<span class="token operator">:</span> Slot<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// an array of 10 positions, making use of the 10 different timeSlots that are available</span>
    sortedSlots <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        sortedSlots<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">let</span> dayTitle<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'Monday'</span><span class="token punctuation">,</span> <span class="token string">'Tuesday'</span><span class="token punctuation">,</span> <span class="token string">'Wednesday'</span><span class="token punctuation">,</span> <span class="token string">'Thursday'</span><span class="token punctuation">,</span> <span class="token string">'Friday'</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// variables for creating a new slot</span>
    <span class="token keyword">let</span> timeStamps<span class="token operator">:</span> TimeStamp<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
        TimeStamp<span class="token punctuation">.</span>MondayMorning<span class="token punctuation">,</span>
        TimeStamp<span class="token punctuation">.</span>TuesdayMorning<span class="token punctuation">,</span>
        TimeStamp<span class="token punctuation">.</span>WednesdayMorning<span class="token punctuation">,</span>
        TimeStamp<span class="token punctuation">.</span>ThursdayMorning<span class="token punctuation">,</span>
        TimeStamp<span class="token punctuation">.</span>FridayMorning<span class="token punctuation">,</span>
        TimeStamp<span class="token punctuation">.</span>MondayAfternoon<span class="token punctuation">,</span>
        TimeStamp<span class="token punctuation">.</span>TuesdayAfternoon<span class="token punctuation">,</span>
        TimeStamp<span class="token punctuation">.</span>WednesdayAfternoon<span class="token punctuation">,</span>
        TimeStamp<span class="token punctuation">.</span>ThursdayAfternoon<span class="token punctuation">,</span>
        TimeStamp<span class="token punctuation">.</span>FridayAfternoon
    <span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function">sortSlots</span><span class="token punctuation">(</span>startVal<span class="token operator">:</span> Slot<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            sortedSlots<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
        <span class="token punctuation">(</span>startVal<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> index<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// remember which box belongs to which slot</span>
            slotToBoxMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> box<span class="token punctuation">.</span>children<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>$time<span class="token punctuation">.</span>day<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>$time<span class="token punctuation">.</span>part<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Monday morning</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Monday afternoon</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                        <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">&#125;</span>
                <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>$time<span class="token punctuation">.</span>part<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Tuesday morning</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Tuesday afternoon</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                        <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">&#125;</span>
                <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>$time<span class="token punctuation">.</span>part<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Wednesday morning</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Wednesday afternoon</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                        <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">&#125;</span>
                <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>$time<span class="token punctuation">.</span>part<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Thursday morning</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Thursday afternoon</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                        <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">&#125;</span>
                <span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">switch</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>$time<span class="token punctuation">.</span>part<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Friday morning</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Friday afternoon</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                        <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                            sortedSlots<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">&#125;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/* Sort the list of slots based on the time */</span>
    <span class="token keyword">function</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">let</span> startVal<span class="token operator">:</span> FreNode<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> box<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">!</span>startVal <span class="token operator">&amp;&amp;</span> box<span class="token punctuation">.</span><span class="token function">getPropertyType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">"Slot"</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// cast the startVal to the expected type, in this case "Slot[]".</span>
            <span class="token comment">// sort the slots based on the time and remember which box belongs to which slot</span>
            <span class="token function">sortSlots</span><span class="token punctuation">(</span>startVal <span class="token keyword">as</span> Slot<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">addSlot</span> <span class="token operator">=</span> <span class="token punctuation">(</span>timeStamp<span class="token operator">:</span> TimeStamp<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// Note that you need to put any changes to the actual model in a 'AST.change' or 'AST.changeNamed',</span>
        <span class="token comment">// because all elements in the model are reactive using mobx.</span>
        <span class="token constant">AST</span><span class="token punctuation">.</span><span class="token function">change</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">let</span> newSlot<span class="token operator">:</span> Slot <span class="token operator">=</span> Slot<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>time<span class="token operator">:</span> FreNodeReference<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">create</span><span class="token generic class-name"><span class="token operator">&lt;</span>TimeStamp<span class="token operator">></span></span></span><span class="token punctuation">(</span>timeStamp<span class="token punctuation">,</span> <span class="token string">"TimeStamp"</span><span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            box<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>newSlot<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>


<span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-table-container"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>table <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-table"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>thead<span class="token operator">></span>
        <span class="token operator">&lt;</span>tr <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-header-row"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>th <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-header-cell"</span><span class="token operator">></span><span class="token operator">--</span><span class="token operator">&lt;</span><span class="token operator">/</span>th<span class="token operator">></span>
            <span class="token punctuation">&#123;</span>#each dayTitle <span class="token keyword">as</span> title<span class="token punctuation">&#125;</span>
                <span class="token operator">&lt;</span>th <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-header-cell"</span><span class="token operator">></span><span class="token punctuation">&#123;</span>title<span class="token punctuation">&#125;</span><span class="token operator">&lt;</span><span class="token operator">/</span>th<span class="token operator">></span>
            <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>tr<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>thead<span class="token operator">></span>
        <span class="token operator">&lt;</span>tbody<span class="token operator">></span>
        <span class="token operator">&lt;</span>tr <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-row"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-header-cell"</span><span class="token operator">></span>Morning<span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
            <span class="token punctuation">&#123;</span>#each sortedSlots  <span class="token keyword">as</span> slots<span class="token punctuation">,</span> index<span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#123;</span>#<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">&#125;</span>
                    <span class="token punctuation">&#123;</span>#<span class="token keyword">if</span> slots<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">&#125;</span>
                        <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-cell"</span><span class="token operator">></span>
                            <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-cell-content"</span><span class="token operator">></span>
                                <span class="token punctuation">&#123;</span>#each slots <span class="token keyword">as</span> slot<span class="token punctuation">&#125;</span>
                                    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-slot-render"</span><span class="token operator">></span>
                                        <span class="token operator">&lt;</span>RenderComponent box<span class="token operator">=</span><span class="token punctuation">&#123;</span>slotToBoxMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">&#125;</span> editor<span class="token operator">=</span><span class="token punctuation">&#123;</span>editor<span class="token punctuation">&#125;</span> <span class="token operator">/</span><span class="token operator">></span>
                                    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                                <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
                            <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                        <span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
                    <span class="token punctuation">&#123;</span><span class="token operator">:</span><span class="token keyword">else</span><span class="token punctuation">&#125;</span>
                        <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-cell"</span><span class="token operator">></span>
                            <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-slot-render"</span><span class="token operator">></span><span class="token constant">NONE</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                        <span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
                    <span class="token punctuation">&#123;</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#123;</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>tr<span class="token operator">></span>
        <span class="token operator">&lt;</span>tr<span class="token operator">></span>
            <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-btn-cell"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
            <span class="token punctuation">&#123;</span>#each timeStamps <span class="token keyword">as</span> stamp<span class="token punctuation">,</span> index<span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#123;</span>#<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">&#125;</span>
                    <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-btn-cell"</span><span class="token operator">></span>
                        <span class="token operator">&lt;</span>IconButton <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"material-icons"</span> on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">addSlot</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token operator">></span>add<span class="token operator">&lt;</span><span class="token operator">/</span>IconButton<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
                <span class="token punctuation">&#123;</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>tr<span class="token operator">></span>
        <span class="token operator">&lt;</span>tr<span class="token operator">></span>
            <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-header-cell"</span><span class="token operator">></span>Afternoon<span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
            <span class="token punctuation">&#123;</span>#each sortedSlots <span class="token keyword">as</span> slots<span class="token punctuation">,</span> index<span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#123;</span>#<span class="token keyword">if</span> index <span class="token operator">>=</span> <span class="token number">5</span><span class="token punctuation">&#125;</span>
                    <span class="token punctuation">&#123;</span>#<span class="token keyword">if</span> slots<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">&#125;</span>
                        <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-cell"</span><span class="token operator">></span>
                            <span class="token punctuation">&#123;</span>#each slots <span class="token keyword">as</span> slot<span class="token punctuation">&#125;</span>
                                <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-slot-render"</span><span class="token operator">></span>
                                    <span class="token operator">&lt;</span>RenderComponent box<span class="token operator">=</span><span class="token punctuation">&#123;</span>slotToBoxMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">&#125;</span> editor<span class="token operator">=</span><span class="token punctuation">&#123;</span>editor<span class="token punctuation">&#125;</span> <span class="token operator">/</span><span class="token operator">></span>
                                <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                            <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
                        <span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
                    <span class="token punctuation">&#123;</span><span class="token operator">:</span><span class="token keyword">else</span><span class="token punctuation">&#125;</span>
                        <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-cell"</span><span class="token operator">></span>
                            <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-slot-render"</span><span class="token operator">></span>
                                <span class="token constant">NONE</span>
                            <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                        <span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
                    <span class="token punctuation">&#123;</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#123;</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>tr<span class="token operator">></span>
        <span class="token operator">&lt;</span>tr<span class="token operator">></span>
            <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-btn-cell"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
            <span class="token punctuation">&#123;</span>#each timeStamps <span class="token keyword">as</span> stamp<span class="token punctuation">,</span> index<span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#123;</span>#<span class="token keyword">if</span> index <span class="token operator">>=</span> <span class="token number">5</span><span class="token punctuation">&#125;</span>
                    <span class="token operator">&lt;</span>td <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"demo-btn-cell"</span><span class="token operator">></span>
                        <span class="token operator">&lt;</span>IconButton <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"material-icons"</span> on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">addSlot</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token operator">></span>add<span class="token operator">&lt;</span><span class="token operator">/</span>IconButton<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">></span>
                <span class="token punctuation">&#123;</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>tr<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>tbody<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>table<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>


<span class="token operator">&lt;</span>style<span class="token operator">></span>
    <span class="token punctuation">.</span>demo<span class="token operator">-</span>table<span class="token operator">-</span>container <span class="token punctuation">&#123;</span>
        background<span class="token operator">-</span>color<span class="token operator">:</span>#fff<span class="token punctuation">;</span>
        color<span class="token operator">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0.87</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        max<span class="token operator">-</span>width<span class="token operator">:</span> <span class="token number">100</span><span class="token operator">%</span><span class="token punctuation">;</span>
        border<span class="token operator">-</span>radius<span class="token operator">:</span>4px<span class="token punctuation">;</span>
        border<span class="token operator">-</span>width<span class="token operator">:</span>1px<span class="token punctuation">;</span>
        border<span class="token operator">-</span>style<span class="token operator">:</span>solid<span class="token punctuation">;</span>
        border<span class="token operator">-</span>color<span class="token operator">:</span><span class="token function">rgba</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">.12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        display<span class="token operator">:</span>inline<span class="token operator">-</span>flex<span class="token punctuation">;</span>
        flex<span class="token operator">-</span>direction<span class="token operator">:</span>column<span class="token punctuation">;</span>
        box<span class="token operator">-</span>sizing<span class="token operator">:</span>border<span class="token operator">-</span>box<span class="token punctuation">;</span>
        position<span class="token operator">:</span>relative<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token punctuation">.</span>demo<span class="token operator">-</span>table <span class="token punctuation">&#123;</span>
        min<span class="token operator">-</span>width<span class="token operator">:</span><span class="token number">100</span><span class="token operator">%</span><span class="token punctuation">;</span>
        border<span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">;</span>
        white<span class="token operator">-</span>space<span class="token operator">:</span>nowrap<span class="token punctuation">;</span>
        border<span class="token operator">-</span>spacing<span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">;</span>
        table<span class="token operator">-</span>layout<span class="token operator">:</span>fixed<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token punctuation">.</span>demo<span class="token operator">-</span>cell <span class="token punctuation">&#123;</span>
        height<span class="token operator">:</span> 200px<span class="token punctuation">;</span>
        border<span class="token operator">-</span>right<span class="token operator">-</span>width<span class="token operator">:</span> 1px<span class="token punctuation">;</span>
        border<span class="token operator">-</span>right<span class="token operator">-</span>style<span class="token operator">:</span> solid<span class="token punctuation">;</span>
        border<span class="token operator">-</span>right<span class="token operator">-</span>color<span class="token operator">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">.12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token punctuation">.</span>demo<span class="token operator">-</span>slot<span class="token operator">-</span>render <span class="token punctuation">&#123;</span>
        margin<span class="token operator">:</span> <span class="token number">0</span> 4px 20px 4px<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token punctuation">.</span>demo<span class="token operator">-</span>header<span class="token operator">-</span>row <span class="token punctuation">&#123;</span>
        height<span class="token operator">:</span> 56px<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token punctuation">.</span>demo<span class="token operator">-</span>header<span class="token operator">-</span>cell <span class="token punctuation">&#123;</span>
        font<span class="token operator">-</span>size<span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">.</span>875rem<span class="token punctuation">;</span>
        line<span class="token operator">-</span>height<span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">.</span>375rem<span class="token punctuation">;</span>
        font<span class="token operator">-</span>weight<span class="token operator">:</span>bolder<span class="token punctuation">;</span>
        box<span class="token operator">-</span>sizing<span class="token operator">:</span>border<span class="token operator">-</span>box<span class="token punctuation">;</span>
        text<span class="token operator">-</span>align<span class="token operator">:</span>left<span class="token punctuation">;</span>
        padding<span class="token operator">:</span> <span class="token number">0</span> 16px <span class="token number">0</span> 16px<span class="token punctuation">;</span>
        border<span class="token operator">-</span>right<span class="token operator">-</span>width<span class="token operator">:</span> 1px<span class="token punctuation">;</span>
        border<span class="token operator">-</span>right<span class="token operator">-</span>style<span class="token operator">:</span> solid<span class="token punctuation">;</span>
        border<span class="token operator">-</span>right<span class="token operator">-</span>color<span class="token operator">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">.12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        background<span class="token operator">-</span>color<span class="token operator">:</span> <span class="token keyword">var</span><span class="token punctuation">(</span><span class="token operator">--</span>mdc<span class="token operator">-</span>theme<span class="token operator">-</span>surface<span class="token punctuation">,</span> #fff<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token punctuation">.</span>demo<span class="token operator">-</span>cell<span class="token operator">-</span>content <span class="token punctuation">&#123;</span>
        justify<span class="token operator">-</span>content<span class="token operator">:</span> space<span class="token operator">-</span>between<span class="token punctuation">;</span>
        flex<span class="token operator">-</span>direction<span class="token operator">:</span> column<span class="token punctuation">;</span>
        display<span class="token operator">:</span> flex<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token punctuation">.</span>demo<span class="token operator">-</span>btn<span class="token operator">-</span>cell <span class="token punctuation">&#123;</span>
        border<span class="token operator">-</span>bottom<span class="token operator">-</span>width<span class="token operator">:</span> 1px<span class="token punctuation">;</span>
        border<span class="token operator">-</span>bottom<span class="token operator">-</span>style<span class="token operator">:</span> solid<span class="token punctuation">;</span>
        border<span class="token operator">-</span>bottom<span class="token operator">-</span>color<span class="token operator">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">.12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        border<span class="token operator">-</span>right<span class="token operator">-</span>width<span class="token operator">:</span> 1px<span class="token punctuation">;</span>
        border<span class="token operator">-</span>right<span class="token operator">-</span>style<span class="token operator">:</span> solid<span class="token punctuation">;</span>
        border<span class="token operator">-</span>right<span class="token operator">-</span>color<span class="token operator">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">.12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        justify<span class="token operator">-</span>content<span class="token operator">:</span> space<span class="token operator">-</span>between<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">></span>
</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
