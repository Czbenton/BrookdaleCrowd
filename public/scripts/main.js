let selectedRequest = {};

function showCreateModal() {
  $("#createModal").modal({
    backdrop: false,
    focus: true
  });
}

function showCloseCSRModal() {
  $("#closeCSRModal").modal({
    backdrop: false,
    focus: true
  });
}

function closeModal(id) {
  $(id).modal.hide();
}

function createNew() {
  const form = document.getElementById("createRequestForm");
  form.submit();
  $("#createModal").modal.hide();
}