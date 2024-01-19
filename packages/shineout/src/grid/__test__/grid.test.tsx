// import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
// import Grid from "..";
import { createClassName } from '../../tests/utils';

const SO_PREFIX = 'grid';
const originClasses = [''];
const originItemClasses = [''];
const {} = createClassName(SO_PREFIX, originClasses, originItemClasses);
