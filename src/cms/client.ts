import ministers from '@cms/ministers';
import deacons from '@cms/deacons';
import images from '@cms/images';
import beliefs from '@cms/beliefs';
import links from '@cms/links';

const cmsClient = {
	fetch: async (query: string, { variables }: { variables?: any } = {}) => {
		const res = {
            ministers,
            deacons,
            images,
            beliefs,
			links
		}[query];
		if (!res) throw new Error(`Unknown query: ${query}`);
		return res;
	},
};

export default cmsClient;
