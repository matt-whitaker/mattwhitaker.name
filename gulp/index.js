import AWS from 'aws-sdk';
import Promise from 'bluebird';

AWS.config.setPromisesDependency(Promise);

export deploy from './deploy';
export serve from './serve';
export clean from './clean';
export build from './build';
export assets from './assets';
