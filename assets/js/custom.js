// flat picker for jamat time
flatpickr('.jamat-input', {
	enableTime: true,
	noCalendar: true,
	dateFormat: 'h:i'
});

flatpickr('.general-input-date', {
	mode: 'range'
});

flatpickr('.general-input-time', {
	enableTime: true,
	noCalendar: true,
	dateFormat: 'h:i'
});

// Notice Add Remove
const noticeContainer = document.querySelector('#noticeContainer');
const addNotice = document.querySelector('#addNotice');
let noticeList = document.querySelectorAll('.notice-item');
let noticeListArray = Array.from(noticeList);

window.addEventListener('DOMContentLoaded', e => {
	addNotice.addEventListener('click', e => {
		console.log(noticeListArray);
		const allId = noticeListArray.map(item => {
			const divId = item.getAttribute('id');
			const id = Number(divId.split('-')[1]);
			return id;
		});
		console.log(allId);
		const id = allId.length > 0 ? Math.max(...allId) + 1 : 0;
		displayNotice(id);
	});
});

function displayNotice(id) {
	const div = document.createElement('div');
	div.className = 'notice-item input-group mb-3';
	div.id = `notice-${id}`;
	div.innerHTML = `
        <input type="text" name="notice" class="form-control" placeholder="Enter A Notice" aria-label="Enter A Notice" />
        <button type="button" onclick="deleteNotice('notice-${id}')" class="btn btn-danger" id="">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path
                    d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
                ></path>
            </svg>
        </button>
    `;

	noticeContainer.insertAdjacentElement('beforeend', div);
	noticeList = document.querySelectorAll('.notice-item');
	noticeListArray = Array.from(noticeList);
}

function deleteNotice(id) {
	const targetNotice = noticeListArray.find(node => node.id === id);
	noticeContainer.removeChild(targetNotice);
	noticeList = document.querySelectorAll('.notice-item');
	noticeListArray = Array.from(noticeList);
}

// $(function () {
// 	// jQuery methods go here...
// 	$('#jamat-input').flatpickr({
// 		enableTime: true,
// 		dateFormat: 'Y-m-d H:i'
// 	});
// });
