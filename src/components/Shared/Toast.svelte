<script>
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { notifications } from "../../utils/notification";

    export let themes = {
        danger: "#E26D69",
        success: "#22c55e",
        warning: "#f0ad4e",
        info: "#5bc0de",
        default: "#aaaaaa",
    };
</script>

<div class="notifications">
    {#each $notifications as notification (notification.id)}
        <div
            animate:flip
            class="toast"
            style="background: {themes[notification.type]};"
            transition:fly={{ y: 40 }}
        >
            <div class="content">{notification.message}</div>
            {#if notification.icon}<i class={notification.icon} />{/if}
        </div>
    {/each}
</div>

<style>
    .notifications {
        position: fixed;
        bottom: 40px;
        right: 40px;
        margin: 0;
        padding: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        pointer-events: none;
    }

    .toast {
        flex: 0 0 auto;
        margin-bottom: 10px;
        border-radius: 8px;
    }

    .content {
        padding: 20px;
        display: block;
        color: white;
        font-weight: 500;
    }
</style>
