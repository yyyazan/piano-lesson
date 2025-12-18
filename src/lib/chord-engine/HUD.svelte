<script>
    export let progress = 50;
    export let timer = 10;
    import Settings from "./Settings.svelte";
</script>

<div class="HUD">
    <div class="timer-box">
        <span class="timer-text">{timer}</span>
        <span class="timer-label">s</span>
    </div>

    <div class="bar">
        <div class="fill" style="width: {progress}%"></div>
    </div>

    <div class="settings">
        <Settings/>
    </div>
</div>

<style>
.HUD {
    width: 70vw;
    height: 7vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #eeeeee;
    border-radius: 25px;
    margin: 0 auto;
    }

.bar {
    height: 12px;
    width: 40vw;
    border-radius: 999px;
    overflow: hidden; /* Cuts off the fill at the rounded corners */
    background: #bdbdbd;
    margin: 0 auto;
}

.fill {
    height: 100%;
    background-color: #114DF2;

    background-image: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 0%,
            rgba(0, 0, 0, 0.1) 100%
    );

    /*  animate progress fill movement */
    transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.timer-box {
    display: flex;
    align-items: baseline;
    gap: 2px;
    color: #555;
    /* Fixed width to prevent jitter when number changes from 10 to 9 */
    width: 40px;
    justify-content: center;
    padding: 40px;

}

.timer-text {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: monospace;
}

.settings {
    padding: 30px;
}

</style>