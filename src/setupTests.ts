import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

beforeEach(() => {
  expect.assertions(1);
});

process.on('unhandledRejection', err => {
  // tslint:disable-next-line:no-console
  console.error('Unhandled promise rejection:', err);
  throw err;
});
