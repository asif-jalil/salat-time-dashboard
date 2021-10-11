function slideToggle(t, e, o) {
	0 === t.clientHeight ? j(t, e, o, !0) : j(t, e, o);
}
function slideUp(t, e, o) {
	j(t, e, o);
}
function slideDown(t, e, o) {
	j(t, e, o, !0);
}
function j(t, e, o, i) {
	void 0 === e && (e = 400), void 0 === i && (i = !1), (t.style.overflow = 'hidden'), i && (t.style.display = 'block');
	var p,
		l = window.getComputedStyle(t),
		n = parseFloat(l.getPropertyValue('height')),
		a = parseFloat(l.getPropertyValue('padding-top')),
		s = parseFloat(l.getPropertyValue('padding-bottom')),
		r = parseFloat(l.getPropertyValue('margin-top')),
		d = parseFloat(l.getPropertyValue('margin-bottom')),
		g = n / e,
		y = a / e,
		m = s / e,
		u = r / e,
		h = d / e;
	window.requestAnimationFrame(function l(x) {
		void 0 === p && (p = x);
		var f = x - p;
		i
			? ((t.style.height = g * f + 'px'), (t.style.paddingTop = y * f + 'px'), (t.style.paddingBottom = m * f + 'px'), (t.style.marginTop = u * f + 'px'), (t.style.marginBottom = h * f + 'px'))
			: ((t.style.height = n - g * f + 'px'),
			  (t.style.paddingTop = a - y * f + 'px'),
			  (t.style.paddingBottom = s - m * f + 'px'),
			  (t.style.marginTop = r - u * f + 'px'),
			  (t.style.marginBottom = d - h * f + 'px')),
			f >= e
				? ((t.style.height = ''),
				  (t.style.paddingTop = ''),
				  (t.style.paddingBottom = ''),
				  (t.style.marginTop = ''),
				  (t.style.marginBottom = ''),
				  (t.style.overflow = ''),
				  i || (t.style.display = 'none'),
				  'function' == typeof o && o())
				: window.requestAnimationFrame(l);
	});
}

let sidebarItems = document.querySelectorAll('.sidebar-item.has-sub');
for (var i = 0; i < sidebarItems.length; i++) {
	let sidebarItem = sidebarItems[i];
	sidebarItems[i].querySelector('.sidebar-link').addEventListener('click', function (e) {
		e.preventDefault();

		let submenu = sidebarItem.querySelector('.submenu');
		if (submenu.classList.contains('active')) submenu.style.display = 'block';

		if (submenu.style.display == 'none') submenu.classList.add('active');
		else submenu.classList.remove('active');
		slideToggle(submenu, 300);
	});
}

window.addEventListener('DOMContentLoaded', event => {
	var w = window.innerWidth;
	if (w < 1200) {
		document.getElementById('sidebar').classList.remove('active');
	}
});
window.addEventListener('resize', event => {
	var w = window.innerWidth;
	if (w < 1200) {
		document.getElementById('sidebar').classList.remove('active');
	} else {
		document.getElementById('sidebar').classList.add('active');
	}
});

document.querySelector('.burger-btn').addEventListener('click', () => {
	document.getElementById('sidebar').classList.toggle('active');
});
document.querySelector('.sidebar-hide').addEventListener('click', () => {
	document.getElementById('sidebar').classList.toggle('active');
});

// Perfect Scrollbar Init
if (typeof PerfectScrollbar == 'function') {
	const container = document.querySelector('.sidebar-wrapper');
	const ps = new PerfectScrollbar(container, {
		wheelPropagation: false
	});
}

// Scroll into active sidebar
document.querySelector('.sidebar-item.active').scrollIntoView(false);

// Notice Add Remove
const noticeContainer = document.querySelector('#noticeContainer');
const addNotice = document.querySelector('#addNotice');
let noticeList = document.querySelectorAll('.notice-item');
let noticeListArray = Array.from(noticeList);

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
