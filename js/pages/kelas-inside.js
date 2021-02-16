let dataTable,
    dataSet = [
        ["2","Asmiati Sony", "2021/02/04 11:32:30","37.7","Ya"],
        ["25","Sudarsih Mahmudah", "2021/02/04 10:28:44","37.8","Ya"],
        ["20","Prima Azha Tridayana", "2021/02/04 8:54:20","38.9","Tidak"],
        ["26","Susi Fallo", "2021/02/04 11:31:01","37.6","Ya"],
        ["18","Nurul Hidayah", "2021/02/04 11:38:42","37.9","Ya"],
        ["19","Peter Sulaiman", "2021/02/04 11:26:30","37.8","Ya"],
        ["3","Aulia Rahma", "2021/02/04 10:55:43","37.7","Ya"],
        ["31","Widi Dwi Armada", "2021/02/04 11:33:24","37.7","Ya"],
        ["13","Levi Ardana", "2021/02/03 16:32:30","37.8","Ya"],
        ["11","Feggy Maebara", "2021/02/04 9:17:29","37.6","Ya"],
        ["22","Rika Himyati Hasna", "2021/02/04 13:34:44","37.9","Ya"],
        ["23","Risma Nopia", "2021/02/04 10:59:51","37.8","Ya"],
        ["8","Diah Ayu Rizki", "2021/02/04 09:12:32","37.6","Ya"],
        ["29","Wahyu Aji Komara", "2021/02/03 10:41:30","38.0","Ya"],
        ["12","Indri Shion", "2021/02/04 07:32:13","37.7","Ya"],
        ["10","Evi Hafizah Rahma", "2021/02/04 10:58:19","37.9","Ya"],
        ["28","Ulfa Mikasa Putri", "2021/02/04 09:42:27","37.7","Ya"],
        ["16","Novi Noritasari", "2021/02/04 08:56:43","38.1","Ya"],
        ["5","Delia Siviana", "2021/02/04 11:12:51","37.7","Ya"],
        ["17","Nur Hartatik", "2021/02/04 09:43:39","37.9","Ya"],
        ["6","Desi Aristyaningrum", "2021/02/04 12:13:46","37.8","Tidak"],
        ["24","Shanti Madoka", "2021/02/04 12:22:55","37.8","Ya"],
        ["27","Tri Yaeger", "2021/02/04 09:00:01","37.9","Ya"],
        ["32","Winarti Mion", "2021/02/04 08:51:20","37.7","Ya"],
        ["30","Wida Harmini Susilowati", "2021/02/04 10:44:07","37.6","Ya"],
        ["14","Lilik Sasha", "2021/02/04 11:12:16","37.6","Ya"],
        ["4","Budi Conny", "2021/02/04 13:42:15","37.7","Tidak"],
        ["9","Dian Battler", "2021/02/04 07:32:23","37.8","Ya"],
        ["7","Devy Sekar Ayu", "2021/02/04 11:08:58","37.9","Ya"],
        ["15","Novan Tri", "2021/02/04 11:05:34","38.0","Ya"],
        ["21","Renny Herlinawati", "2021/02/04 09:34:30","37.8","Ya"],
        ["1","Adi Prima Laksana", "2021/02/04 09:51:29","37.7","Ya"],
    ];

$(function () {
    let urlParam = (new URLSearchParams(window.location.search)).get("q").split("-");
    if (urlParam[0] != "semua")
        $("#js-table-title").html(`MURID-MURID KELAS ${urlParam[1]} ${urlParam[0].toUpperCase()}`);
    else
        $("#js-table-title").html(`SEMUA MURID`);

    dataTable = $('.js-table').DataTable({
        dom: 'Bfrtilp',
        responsive: true,
        data: dataSet,
        columns: [
            { title: "#" },
            { title: "Nama" },
            { title: "Cek Terakhir" },
            { title: "Suhu" },
            { title: "Memakai Masker?" },
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
        if (parseFloat(data[3]) >= 38 || data[4] == "Tidak")
            dataTable.row(rowIdx).node().childNodes.forEach(element => {
                element.className += " bg-red";
            });
    });
    // Idk man, but entry length selector is buggy, this is the fix :
    setTimeout(() => {
        $("#DataTables_Table_0_length .bootstrap-select select[name=DataTables_Table_0_length]").insertBefore("#DataTables_Table_0_length .bootstrap-select");
        $("#DataTables_Table_0_length .bootstrap-select").remove();
    }, 1000);
});