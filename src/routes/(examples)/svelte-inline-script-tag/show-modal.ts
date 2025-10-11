const showModal = () => {
	const dialog = document.currentScript?.previousElementSibling;
	if (dialog instanceof HTMLDialogElement) dialog.showModal();
};

export const showModalScript = `<script>(${showModal})()</script>`;
