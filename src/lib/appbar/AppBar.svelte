<script lang="ts">
	import ThemeToggle from '$lib/theming/ThemeToggle.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import GithubLogo from '$lib/icons/GithubLogo.svelte';
	import Tooltip from '../buttons/Tooltip.svelte';

	let popoverElem: HTMLDivElement;
</script>

<!-- The AppBar is always shown at the top of the viewport -->
<!-- TODO add search mechanism -->
<div bind:this={popoverElem} popover='auto' id='main-menu'>
	<nav class='main-menu'>
		<a href="/Documentation/Intro" class="linkLogo" >
			<p class='menu-item' on:click={() => {popoverElem.hidePopover()} }>Docs</p>
		</a>
		<a href="/Tutorial/Intro" class="linkLogo" >
			<p class='menu-item' on:click={() => {popoverElem.hidePopover()} }>Tutorial</p>
		</a>
		<a href="/Examples/Intro" class="linkLogo">
			<p class='menu-item' on:click={() => {popoverElem.hidePopover()} }>Examples</p>
		</a>
		<a href="/Demos/Intro" class="linkLogo">
			<p class='menu-item' on:click={() => {popoverElem.hidePopover()} }>Demo</p>
		</a>
		<a href="/Guiding_Principles/Intro" class="linkLogo">
			<p class='menu-item' on:click={() => {popoverElem.hidePopover()} }>Guidelines</p>
		</a>
	</nav>
	<button class='close-button' popovertarget='main-menu' popovertargetaction='hide'>
			<img src="/images/close-icon.png" style="color: red" alt="Freon Logo" height="24px"/>
	</button>
</div>

<div class="app-bar">
	<div class="app-bar-small">
		<!-- this button is shown only when the viewport is small -->
		<!-- it is used to open the left panel which shows the navigator -->
		<Tooltip tip="Hide/show content tree" bottom>
			<button class='app-bar-button' popovertarget='main-menu' popovertargetaction='toggle'>
				<span class='button-content'>
				<MenuIcon />
				</span>
			</button>
		</Tooltip>

		<div class="title">Freon</div>

	</div>

	<div class='app-bar-large'>
		<a href="https://www.freon4dsl.dev" class="linkLogo">
			<Tooltip tip="home" bottom>
				<img src="/freonlogo.png" alt="Freon Logo" height="24" />
			</Tooltip>
		</a>
		<a href="/" class="title">
		<div >Freon</div>
		</a>
		<nav class='main-menu'>
		<a href="/Documentation/Intro" class="linkLogo">
				<h6>Docs</h6>
		</a>
		<a href="/Tutorial/Intro" class="linkLogo">
				<h6>Tutorial</h6>
		</a>
		<a href="/Examples/Intro" class="linkLogo">
				<h6>Examples</h6>
		</a>
		<a href="/Demos/Intro" class="linkLogo">
				<h6>Demo</h6>
		</a>
		<a href="/Guiding_Principles/Intro" class="linkLogo">
			<h6>Guidelines</h6>
		</a>
		</nav>
	</div>

	<span class="linkLogo">
		<Tooltip tip="dark mode" bottom>
			<ThemeToggle />
		</Tooltip>
	</span>

	<a target="_blank" href="https://github.com/freon4dsl/Freon4dsl.git" class="linkLogo">
		<Tooltip tip="github source" bottom>
			<GithubLogo />
		</Tooltip>
	</a>
</div>

<style>
		[popover] {
				position: relative;
				border: solid 1px var(--theme-colors-accent);
				border-radius: 3px;
				box-shadow: var(--pi-popup-box-shadow);
				inset: var(--pi-header-height) 10px auto 10px;
				padding: 4px;
				width: calc(100vw - 20px);
				 & nav {
						 display: flex;
						 flex-direction: column;
						 font-size: 1.2rem;
						 font-weight: bold;
						 gap: 4px;
             & a {
                 border-bottom: solid 1px var(--theme-colors-accent);
								 &:last-child {
										 border-bottom: none;
								 }
             }
				 }
		}
		/*:popover-open {*/
    /*    opacity: 0;*/
    /*    animation: animation-slide-in-down forwards;*/
		/*		animation-delay: 0.2s;*/
    /*    animation-duration: 0.3s;*/
    /*    animation-timing-function: ease-in-out;*/
		/*}*/

		::backdrop {
				background: #0004;
				backdrop-filter: blur(2px);

				/*opacity: 0;*/
				/*animation: animation-fade-in forwards;*/
				/*animation-duration: 0.3s;*/
				/*animation-timing-function: ease-in-out;*/
		}
		.close-button {
        border: solid 1px var(--theme-colors-bg_color);
        padding: 0;
				position: absolute;
				inset: 10px 10px auto auto;
		}
		.app-bar-button {
				position: relative;
				border: solid 1px var(--theme-colors-bg_app_bar);
				padding: 0;
		}
    .button-content {
			background-color: var(--theme-colors-bg_app_bar);
    }
	.main-menu {
		display: flex;
    align-content: space-between;
	}
	.menu-item {
			color: var(--theme-colors-color);
	}
	.linkLogo {
		margin-right: 8px;
		margin-left: 8px;
	}
	.app-bar {
    display: flex;
    align-items: center;
    padding: 0 4px 0 6px;
		height: var(--pi-header-height);
		color: var(--theme-colors-text_app_bar);
		background: var(--theme-colors-bg_app_bar);
		font-size: var(--pi-header-font-size);
		line-height: 1;
		min-width: inherit;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: 20;
	}
	.title {
		flex: 1;
		margin-left: 0.5rem;
		white-space: nowrap;
		text-align: left;
		color: var(--theme-colors-inverse_color);
	}
	img {
		/*max-width: 180px;*/
		/*max-height: calc(var(--pi-header-height) - 5px);*/
		/*margin-top: 3px;*/
		/*margin-bottom: 3px;*/
		/*margin-left: auto;*/
		/*margin-right: 10px;*/
	}
</style>
