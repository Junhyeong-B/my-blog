import { getNavigationMenus } from '@/service/nav';

const joinMock = jest.fn();
const readFileMock = jest.fn();

jest.mock('path', () => ({
  join: (...args: string[]) => joinMock(...args),
}));

jest.mock('fs', () => ({
  promises: {
    readFile: (...args: string[]) => readFileMock(...args),
  },
}));

describe('Nav test suite', () => {
  const someFilePath = 'someFilePath';
  const navigationData = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'About',
      url: '/',
    },
    {
      name: 'Posts',
      url: '/',
    },
    {
      name: 'Contact',
      url: '/',
    },
  ];

  test('getNavigationMenues test', async () => {
    joinMock.mockReturnValueOnce(someFilePath);
    readFileMock.mockReturnValueOnce(JSON.stringify(navigationData));

    const result = await getNavigationMenus();

    expect(result).toEqual(navigationData);
    expect(joinMock).toBeCalledWith(process.cwd(), 'data', 'nav', 'navs.json');
    expect(readFileMock).toBeCalledWith(someFilePath, 'utf-8');
  });
});
