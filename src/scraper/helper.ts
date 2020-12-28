import fs from 'fs';

export const wait = (delayInMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayInMs));

export const readOrExecute = async <T>(
  filename: string,
  executeFn: () => Promise<T>
): Promise<{ data: T; executed: boolean }> => {
  try {
    const content = fs.readFileSync(filename, { encoding: 'utf8' });
    return { data: JSON.parse(content), executed: false };
  } catch (e) {
    const executeResult = await executeFn();
    fs.writeFileSync(filename, JSON.stringify(executeResult), {
      encoding: 'utf8'
    });
    return { data: executeResult, executed: true };
  }
};
