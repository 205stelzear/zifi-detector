import App from './App.svelte';
import './styles/layout.css';

// After
import './styles/animations.css';

const app = new App({
	target: document.getElementById('app')!,
});

export default app;
