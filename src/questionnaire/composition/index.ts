import { container } from './core';

import '../guards/composition';
import '../services/composition';

container.registerSingleton<Window>(() => window);
export {container};