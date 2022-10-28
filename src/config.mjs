export const SITE = {
	name: 'Dyne.org',

	origin: 'https://dyne.org',
	basePathname: '/',

	title: 'Dyne.org digital community and free software foundry',
	description:
		'🚀 A non-profit foundation and free software foundry with more than 10 years of expertise in developing tools and narratives for community empowerment.',
	// '🚀 Dyne.org is a software foundry and research organization dedicated to share the benefits of freedom in the digital world. We share our ideas and inventions to promote horizontal access to technology, education and art.'
};

export const BLOG = {
	disabled: false,
	postsPerPage: 4,

	blog: {
		disabled: false,
		pathname: 'blog', // blog main path, you can change this to "articles" (/articles)
	},

	post: {
		disabled: false,
		pathname: '', // empty for /some-post, value for /pathname/some-post
	},

	category: {
		disabled: false,
		pathname: 'category', // set empty to change from /category/some-category to /some-category
	},

	tag: {
		disabled: false,
		pathname: 'tag', // set empty to change from /tag/some-tag to /some-tag
	},
};
