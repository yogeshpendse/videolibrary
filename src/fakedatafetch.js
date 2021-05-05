import { data } from "./Data";
export function fakedatafetch() {
  const datatobesend = [...data];
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve({ success: true, status: 200, data: datatobesend }),
      2000
    );
  });
}
