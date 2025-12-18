<script lang="ts">
    import owl from "../../assets/owl.jpg";

    // which section is currently active (highlighted)
    export let active: "chords" | "scales" | "profile" | "home" = "chords";

    export let onNavigate: (target: "home" | "chords" | "scales" | "profile") => void = () => {};

    function go(target: "home" | "chords" | "scales" | "profile") {
        onNavigate(target);
    }
</script>

<header class="header">
    <div class="brand" on:click={() => go("home")}>
        <img src={owl} alt="owl logo" class="logo" />
        <h1 class="title">guitar lesson</h1>
    </div>

    <nav class="nav">
<!--        <button-->
<!--                class:selected={active === "chords"}-->
<!--                on:click={() => go("chords")}-->
<!--        >-->
<!--            chords-->
<!--        </button>-->
<!--        <button-->
<!--                class:selected={active === "scales"}-->
<!--                on:click={() => go("scales")}-->
<!--        >-->
<!--            scales-->
<!--        </button>-->
<!--        <button-->
<!--                class:selected={active === "profile"}-->
<!--                on:click={() => go("profile")}-->
<!--        >-->
<!--            profile-->
<!--        </button>-->
    </nav>
</header>

<style>
    .header {
        position: sticky;
        top: 0;
        z-index: 10;

        display: flex;
        align-items: center;
        justify-content: center;

        background: white;


        font-family: garamond, serif;
        color: #4f4f4f;
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;

    }

    .logo {
        width: calc(50px + 2vw);
        height: calc(50px + 2vw);
        object-fit: cover;
    }

    .title {
        font-weight: 500;
        font-size: calc(20px + 1vw);
        margin: 15px;
    }
    .title:hover {
        color: #3f58ff;
    }

    .nav {
        display: flex;
        gap: 24px;
        font-size: 16px;
    }

    .nav button {
        background: none;
        border: none;
        padding: calc(10px + 0.5vw);
        margin: 5px;
        font-family: garamond, sans-serif;
        font-size: 16px;
        color: inherit;
        cursor: pointer;
        position: relative;
        text-transform: uppercase;
        border-radius: 12px;
        font-weight: 600;
    }



    .nav button:hover {
        color: #3f58ff;
        background-color: #eaeaea;
    }

    .nav button::after {
        /*todo wtf is this*/
        content: "";
        position: absolute;
        left: 0;
        bottom: -0.2rem;
        width: 0;
        height: 1px;
        background: #4f4f4f;
    }

    .nav button.selected {
        font-weight: 800;
        background-color: #eaeaea;

    }
</style>