const ctx = document.getElementById('usageChart');

new Chart(ctx, {

    type: 'line',

    data: {

        labels: [
            'Lun',
            'Mar',
            'Mié',
            'Jue',
            'Vie',
            'Sáb',
            'Dom'
        ],

        datasets: [{

            label: 'Horas en Internet',

            data: [2,4,3,5,6,4,3],

            borderWidth: 3

        }]
    }

});