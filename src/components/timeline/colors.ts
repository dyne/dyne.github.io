type TimelineColorDefs = {
	accent: string;
	bg: string;
	border: string;
};

export const timelineColors: Record<string, TimelineColorDefs> = {
	cyber: {
		accent: 'bg-dyne-purple',
		bg: 'bg-dyne-purple/20',
		border: 'border-dyne-purple',
	},
	circular: {
		accent: 'bg-dyne-green',
		bg: 'bg-dyne-green/20',
		border: 'border-dyne-green',
	},
	art: {
		accent: 'bg-white',
		bg: 'bg-white/20',
		border: 'border-white',
	},
	software: {
		accent: 'bg-dyne-orange',
		bg: 'bg-dyne-orange/20',
		border: 'border-dyne-orange',
	},
	default: {
		accent: 'bg-gray-400',
		bg: 'transparent',
		border: 'border-gray-400/30',
	},
};
