<script lang="ts">
    import { DonutChart, BarChartSimple } from '@carbon/charts-svelte';
    import '@carbon/charts-svelte/styles.css';
    import { tasks } from "../../../stores/tasks";
    import { projects } from "../../../stores/projects";
    import { groupTasksByProjectId, groupTasksByWeek, transformTasksToWeekTotalHours, calculateProjectHours } from "../../../utils/functions";
  
    export let data;

    const chartInfo = calculateProjectHours($tasks, $projects);
    const barInfo = transformTasksToWeekTotalHours(groupTasksByWeek($tasks));

    console.log(chartInfo);


    const options = {
      "title": "Total de horas por proyecto",
      "donut": {
        "center": {
          "label": "Total"
        }
      },
      "height": "400px",
      "width": "50%"
    };

    const barOptions = {
    title: "Total de horas por semana",
      axes: {
        left: {
          mapsTo: "totalHours",
          title: "Total de Horas"
        },
        bottom: {
          mapsTo: "week",
          scaleType: "labels",
          title: "Semana"
        }
      },
      height: "400px",
      width: "50%",
      bar: {
        width: {
          max: 50
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        enabled: true
      }
    };


  
    let { supabase, session } = data;
    $: ({ supabase, session } = data);
  
</script>

<main>
  <div class="w-full px-10 my-5">
    {#if session}
      <div class='w-full'>
        <h1 class="text-2xl font-bold mb-5">Dashboard</h1>
        <div class="flex flex-row min-w-full p-10 bg-white rounded-lg space-x-5">
            <DonutChart data={chartInfo} {options} />
            <BarChartSimple data={barInfo} options={barOptions} />
        </div>
      </div>
    {/if}
  </div>
</main>
