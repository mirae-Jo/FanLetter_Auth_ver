import { createContext } from "react";

// 여기서 null이 의미하는 것은 무엇일까요?
// => null 이 가진 의미는 없고 defaultValue로 들어가서
//    불러오는 자리에 value가 비어있으면 null로 대체됨
export const MainContext = createContext(null);
