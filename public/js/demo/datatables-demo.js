
$(document).ready(function () {
  $('#dataTable').DataTable({
  });
});

$(document).ready(function () {
  $('#dataTableNoOrder').DataTable({
    "ordering": false,
  });
});

$(document).ready(function () {
  $('#dataTableDesc').DataTable({
    order: [[0, "desc"]]
  });
});
