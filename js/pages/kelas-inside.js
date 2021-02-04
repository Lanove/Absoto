let dataTable,
    dataSet = [
        ["Tiger Nixon", "System Architect", "Edinburgh", "54.21", "2011/04/25", "$320,800"],
        ["Garrett Winters", "Accountant", "Tokyo", "84.22", "2011/07/25", "$170,750"],
        ["Ashton Cox", "Junior Technical Author", "San Francisco", "15.62", "2009/01/12", "$86,000"],
        ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "62.24", "2012/03/29", "$433,060"],
        ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
        ["Brielle Williamson", "Integration Specialist", "New York", "48.04", "2012/12/02", "$372,000"],
        ["Herrod Chandler", "Sales Assistant", "San Francisco", "96.08", "2012/08/06", "$137,500"],
        ["Rhona Davidson", "Integration Specialist", "Tokyo", "62.00", "2010/10/14", "$327,900"],
        ["Colleen Hurst", "Javascript Developer", "San Francisco", "23.60", "2009/09/15", "$205,500"],
        ["Sonya Frost", "Software Engineer", "Edinburgh", "16.67", "2008/12/13", "$103,600"],
        ["Jena Gaines", "Office Manager", "London", "38.14", "2008/12/19", "$90,560"],
        ["Quinn Flynn", "Support Lead", "Edinburgh", "94.97", "2013/03/03", "$342,000"],
        ["Charde Marshall", "Regional Director", "San Francisco", "67.41", "2008/10/16", "$470,600"],
        ["Haley Kennedy", "Senior Marketing Designer", "London", "35.97", "2012/12/18", "$313,500"],
        ["Tatyana Fitzpatrick", "Regional Director", "London", "19.65", "2010/03/17", "$385,750"],
        ["Michael Silva", "Marketing Designer", "London", "15.81", "2012/11/27", "$198,500"],
        ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000"],
        ["Gloria Little", "Systems Administrator", "New York", "17.21", "2009/04/10", "$237,500"],
        ["Bradley Greer", "Software Engineer", "London", "25.58", "2012/10/13", "$132,000"],
        ["Dai Rios", "Personnel Lead", "Edinburgh", "22.90", "2012/09/26", "$217,500"],
        ["Jenette Caldwell", "Development Lead", "New York", "19.37", "2011/09/03", "$345,000"],
        ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "61.54", "2009/06/25", "$675,000"],
        ["Caesar Vance", "Pre-Sales Support", "New York", "83.30", "2011/12/12", "$106,450"],
        ["Doris Wilder", "Sales Assistant", "Sydney", "30.23", "2010/09/20", "$85,600"],
        ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000"],
        ["Gavin Joyce", "Developer", "Edinburgh", "88.22", "2010/12/22", "$92,575"],
        ["Jennifer Chang", "Regional Director", "Singapore", "92.39", "2010/11/14", "$357,650"],
        ["Brenden Wagner", "Software Engineer", "San Francisco", "13.14", "2011/06/07", "$206,850"],
        ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000"],
        ["Shou Itou", "Regional Marketing", "Tokyo", "88.99", "2011/08/14", "$163,000"],
        ["Michelle House", "Integration Specialist", "Sydney", "27.69", "2011/06/02", "$95,400"],
        ["Suki Burks", "Developer", "London", "68.32", "2009/10/22", "$114,500"],
        ["Prescott Bartlett", "Technical Author", "London", "36.06", "2011/05/07", "$145,000"],
        ["Gavin Cortez", "Team Leader", "San Francisco", "28.60", "2008/10/26", "$235,500"],
        ["Martena Mccray", "Post-Sales support", "Edinburgh", "82.40", "2011/03/09", "$324,050"],
        ["Unity Butler", "Marketing Designer", "San Francisco", "53.84", "2009/12/09", "$85,675"]
    ];

$(document).ready(function () {
    dataTable = $('.js-table').DataTable({
        dom: 'lBfrtip',
        responsive: true,
        data: dataSet,
        columns: [
            { title: "Name" },
            { title: "Position" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            { title: "Salary" }
        ],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "language": {
            "info": "Menampilkan _START_ ke _END_ dari _TOTAL_ entri",
            "search": "Cari:",
            "emptyTable": "Tidak ada data yang tersedia dalam tabel",
            "infoEmpty": "Tidak ada entri",
            "infoFiltered": "(terfilter dari _MAX_ entri total)",
            "lengthMenu": "Menampilkan _MENU_ entri",
            "loadingRecords": "Tunggu sebentar...",
            "processing": "Memproses",
            "zeroRecords": "Tidak ditemukan data yang cocok",
            "paginate": {
                "first": "Pertama",
                "last": "Terakhir",
            },
            "aria": {
                "sortAscending": " aktifkan untuk urutkan naik",
                "sortDescending": " aktifkan untuk urutkan turun",
            }
        }
    });
    dataTable.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var data = this.data();
        if (data[3] <= 20)
            dataTable.row(rowIdx).node().childNodes.forEach(element => {
                element.className += " bg-red";
            });
    });
});