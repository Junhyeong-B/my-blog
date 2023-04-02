import {
  getAllFiles,
  FrontMatter,
  getAllFileFrontMatters,
  formatSlug,
  getBlogContentBySlug,
} from '@/service/files';

const joinMock = jest.fn();
jest.mock('path', () => ({
  join: () => joinMock(),
}));

const readFileSyncMock = jest.fn();
const readdirSyncMock = jest.fn();
const statSyncMock = jest.fn();
jest.mock('fs', () => ({
  readFileSync: () => readFileSyncMock(),
  readdirSync: () => readdirSyncMock(),
  statSync: () => statSyncMock(),
}));

describe('mdx test suite', () => {
  const somePath = 'somePath.md';
  const someFileList = ['file.md', 'file1.md'];
  const someFrontMatter: FrontMatter = {
    date: '2023-03-29',
    dir: 'test.md',
    draft: false,
    imageUrl: 'someImageUrl.com',
    slug: 'test',
    summary: 'someSummary',
    tags: ['tags'],
    title: 'someTitle',
  };

  beforeEach(() => {
    joinMock.mockReturnValue(somePath);
    readdirSyncMock.mockReturnValue(someFileList);
    statSyncMock.mockReturnValue({
      isDirectory: () => false,
    });
    readFileSyncMock.mockReturnValue(somePath);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllFiles test - return an array of file list', () => {
    const result = getAllFiles('folder1', 'folder2');

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    result.forEach((filePath) => {
      expect(typeof filePath).toBe('string');
      expect(filePath).toBe(somePath);
    });
  });

  test('getAllFilesFrontMatter test - return all front matter of .md files', () => {
    jest.mock('gray-matter', () => ({
      default: jest.fn(() => someFrontMatter),
    }));

    const result = getAllFileFrontMatters('folder1');

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    result.forEach((frontMatter) => {
      expect(frontMatter.dir).toBe(somePath);
    });
  });

  test('formatSlug test - return file name from file path', () => {
    const fileName = 'someFile';
    const filePath = `C:\\folder1\\folder2\\${fileName}.md`;
    const result = formatSlug(filePath);

    expect(result).toBe(fileName);
  });

  describe('getBlogContentBySlug test', () => {
    test('should return null with not exist', () => {
      const result = getBlogContentBySlug('nothing');

      expect(result).toBeNull();
    });
  });
});
