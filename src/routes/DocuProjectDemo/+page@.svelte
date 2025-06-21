<script lang="ts">
	import { FreonLayout, WebappConfigurator } from '@freon4dsl/webapp-lib';
	import { InsuranceModelEnvironment } from '$lib/demo/insurance-packaged.mjs';
	import { MockServer } from '$lib/demo/MockServer';

	// @ts-expect-error InsuranceModelEnvironment imported from .mjs file which does not include the FreEnvironment interface
	WebappConfigurator.getInstance().setEditorEnvironment(InsuranceModelEnvironment.getInstance());
	WebappConfigurator.getInstance().setServerCommunication(new MockServer());
	// todo WebappConfigurator.getInstance().isDemo = true;
</script>

<svelte:head>
	<!-- Fonts -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />

	<!-- Fonts and CSS -->
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Material Icons -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

	<!-- Font Awesome	-->
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" rel="stylesheet" />

	<!-- SMUI/Site Styles -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-material-ui@7.0.0/bare.min.css" />
	<link rel="stylesheet" href="/demo-global.css" />
	<link rel="stylesheet" href="/demo-site.css" media="(prefers-color-scheme: light)" />
	<link rel="stylesheet" href="/demo-site-dark.css" media="screen and (prefers-color-scheme: dark)" />
</svelte:head>

<div class="demo">
	<FreonLayout />
</div>
