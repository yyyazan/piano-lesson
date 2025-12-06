<script>
    export let progress = 50;
</script>

<div class="HUD">
    <div class="bar">
        <div class="fill" style="width: {progress}%"></div>
    </div>

</div>

<style>
.HUD {
    width: 70vw;
    height: 10vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #eeeeee;
    border-radius: 9px;
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
    background-color: #2196F3; /* Nice bright blue */

    background-image: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 51%,
            rgba(0, 0, 0, 0.1) 100%
    );

    /* Smoothly animate changes to the width */
    transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}




</style>