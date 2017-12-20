import AWS from 'aws-sdk';
import Promise from 'bluebird';

AWS.config.setPromisesDependency(Promise);

export deploy from './deploy';
export serve from './serve';
export clean from './clean';
export bower from './bower';
export assets from './assets';
export css from './css';
export html from './html';
