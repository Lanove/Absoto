
let chartMurid,chartGuru;
$(function () {
    //Widgets count
    $('.count-to').countTo();

    //Sales count to
    $('.sales-count-to').countTo({
        formatter: function (value, options) {
            return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ').replace('.', ',');
        }
    });
    initChartAbsensi();
});

function initChartAbsensi() {
    var ctx2 = document.getElementById('js-record-murid-chart').getContext('2d');
    var ctx = document.getElementById('js-record-guru-chart').getContext('2d');
    chartGuru = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['28/01/2021', '29/01/2021', '30/01/2021', '31/01/2021', '01/02/2021', '02/02/2021', '03/02/2021'],
            datasets: [ {
                label: 'Guru',
                backgroundColor: $.AdminBSB.options.colors.blue,
                borderColor: '#ffffff',
                borderWidth: 1,
                data: [
                    22,
                    22,
                    22,
                    0,
                    22,
                    22,
                    21
                ]
            }, {
                label: 'Karyawan',
                backgroundColor: $.AdminBSB.options.colors.red,
                borderColor: '#ffffff',
                borderWidth: 1,
                data: [
                    9,
                    10,
                    9,
                    2,
                    10,
                    10,
                    10
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio:false,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Absensi Guru dan Karyawan'
            }
        }
    });
    chartMurid = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['28/01/2021', '29/01/2021', '30/01/2021', '31/01/2021', '01/02/2021', '02/02/2021', '03/02/2021'],
            datasets: [{
                label: 'Murid',
                backgroundColor: $.AdminBSB.options.colors.teal,
                borderColor: '#ffffff',
                borderWidth: 1,
                data: [
                    345,
                    360,
                    357,
                    0,
                    358,
                    361,
                    361
                ]
            } ]
        },
        options: {
            responsive: true,
            maintainAspectRatio:false,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Absensi Murid'
            }
        }
    });
}
