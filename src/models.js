import path from "path";
import fs from "fs";

/**
 * Value Algebraic Structure.
 * @param {*} value
 * @returns
 */
export const Value = (value) => ({
  is: (secondValue) => value === secondValue,
  isNot: (secondValue) => value !== secondValue,
  isGreatherThan: (secondValue) => value > secondValue,
  isLowerThan: (secondValue) => value < secondValue,
});

/**
 * Persistence Algebraic Structure, it allows to create a CRUD of any data object
 * using a local JSON File.
 * @param {*} storage: localStorage or sessionStorage.
 * @returns { start, clear, create, edit, get, delete, getAll }
 */
export const Persistence = (filename) => ({
  store: (list) => {
    fs.writeFileSync(filename, JSON.stringify({ data: list }));
    return Persistence(filename);
  },
  load: () => {
    try {
      const dataFile = fs.readFileSync(filename, "utf-8");
      return JSON.parse(dataFile).data;
    } catch (e) {
      return Persistence(filename).start().load();
    }
  },
  start: () => {
    Persistence(filename).store([]);
    return Persistence(filename);
  },
  clear: () => {
    Persistence(filename).start();
    return Persistence(filename);
  },
  create: (data) => {
    const dataList = Persistence(filename).getAll();
    Persistence(filename).store([
      ...dataList,
      { id: dataList.length + 1, ...data },
    ]);
    return Persistence(filename);
  },
  edit: (data) => {
    Persistence(filename).store([
      ...Persistence(filename)
        .getAll()
        .filter((item) => item.id !== data.id),
      data,
    ]);
    return Persistence(filename);
  },
  get: (id) => {
    return Persistence(filename)
      .getAll()
      .find((item) => item.id === id);
  },
  delete: (id) => {
    Persistence(filename).store(
      Persistence(filename)
        .getAll()
        .filter((item) => item.id !== id)
    );
    return Persistence(filename);
  },
  getAll: () => {
    return Persistence(filename).load();
  },
});
