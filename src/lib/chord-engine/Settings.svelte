<script lang="ts">
    import { slide } from 'svelte/transition';

    let isOpen = false;

    // Placeholder values
    let volume = 50;
    let showTimer = true;

    function toggle() {
        isOpen = !isOpen;
    }

    function handleBackdropClick() {
        isOpen = false;
    }
</script>

<div class="settings-wrapper">
    <button class="gear-edge" on:click={toggle} aria-label="Settings">
        <span class="gear-front">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
        </span>
    </button>

    {#if isOpen}
        <div class="backdrop" on:click={handleBackdropClick} role="presentation"></div>

        <div class="menu" transition:slide={{ duration: 200, axis: 'y' }}>
            <h3>Settings</h3>

            <div class="control-group">
                <label for="vol">Volume</label>
                <input id="vol" type="range" min="0" max="100" bind:value={volume} />
            </div>

            <div class="control-group">
                <label class="checkbox-label">
                    <input type="checkbox" bind:checked={showTimer} />
                    Show Timer
                </label>
            </div>

            <div class="info">
                <span>v1.0.0</span>
            </div>
        </div>
    {/if}
</div>

<style>
    .settings-wrapper {
        position: relative;
        z-index: 50;
    }

    /* --- THE BUTTON STYLES (Adapted) --- */

    /* The dark underlying circle */
    .gear-edge {
        background: hsl(248, 81%, 40%);
        border: none;
        padding: 0;
        cursor: pointer;
        position: relative;

        /* Make it a circle */
        width: 48px;
        height: 48px;
        border-radius: 50%;
    }

    /* The blue top face */
    .gear-front {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;

        background: #114DF2;
        color: white;

        /* Match size to edge */
        width: 100%;
        height: 100%;
        border-radius: 50%; /* Circle */

        /* Animation State */
        transform: translateY(-6px);
    }

    /* HOVER: Lift up */
    .gear-edge:hover .gear-front {
        transform: translateY(-4px);
    }

    /* CLICK: Push down */
    .gear-edge:active .gear-front {
        transform: translateY(-1px);
    }

    /* --- MENU STYLES --- */

    .backdrop {
        position: fixed;
        inset: 0;
        z-index: -1;
    }

    .menu {
        position: absolute;
        top: 60px;
        right: 0;
        width: 200px;
        background: white;
        border: 4px solid #114DF2;
        border-radius: 12px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        text-align: left;
    }

    h3 {
        margin: 0;
        font-size: 1rem;
        color: #333;
        border-bottom: 1px solid #eee;
        padding-bottom: 8px;
        font-family: Nunito, sans-serif; /* Added font consistency */
        font-weight: 600;
    }

    .control-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.9rem;
        color: #666;
        font-family: Nunito, sans-serif;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    }

    input[type=range] {
        width: 100%;
        accent-color: #114DF2; /* Matches your theme blue */
    }

    .info {
        margin-top: 8px;
        font-size: 0.75rem;
        color: #999;
        text-align: right;
    }
</style>