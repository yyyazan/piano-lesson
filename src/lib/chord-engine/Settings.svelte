<script lang="ts">
    import { slide } from 'svelte/transition';

    let isOpen = false;

    // Placeholder values - later you can move these to game.svelte.ts
    let volume = 50;
    let showTimer = true;

    function toggle() {
        isOpen = !isOpen;
    }

    // Optional: Close menu when clicking outside (simple version)
    function handleBackdropClick() {
        isOpen = false;
    }
</script>

<div class="settings-wrapper">
    <!-- The Gear Button -->
    <button class="gear-btn" on:click={toggle} aria-label="Settings">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    </button>

    <!-- The Dropdown Menu -->
    {#if isOpen}
        <!-- Backdrop to catch clicks outside -->
        <div class="backdrop" on:click={handleBackdropClick} role="presentation"></div>

        <div class="menu" transition:slide={{ duration: 200, axis: 'y' }}>
            <h3>Settings</h3>

            <div class="control-group">
                <label for="vol">Volume</label>
                <input id="vol" type="range" min="0" max="100" bind:value={volume} />
            </div>

            <div class="control-group">
                <label>
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
        position: relative; /* Anchor for the absolute menu */
        z-index: 50;
    }

    .gear-btn {
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #555;
        transition: all 0.2s;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }

    .gear-btn:hover {
        background: #f5f5f5;
        transform: rotate(45deg); /* Spin effect */
        color: #2196F3;
    }

    .backdrop {
        position: fixed;
        inset: 0;
        z-index: -1; /* Behind the menu but in front of everything else */
    }

    .menu {
        position: absolute;
        top: 60px; /* Right below the button */
        right: 0;
        width: 200px;
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
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
    }

    .control-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.9rem;
        color: #666;
    }

    /* Range Slider Styling */
    input[type=range] {
        width: 100%;
        accent-color: #2196F3;
    }

    .info {
        margin-top: 8px;
        font-size: 0.75rem;
        color: #999;
        text-align: right;
    }
</style>