import React, { createContext, useState } from "react";
/*
 consumer が Provider を見つけることができた場合には、たとえ Provider が値を提供していなくとも、
 この初期値は参照されません。
 */
export const Context = createContext([{}, () => {}]);
/**
 * グローバルstateを提供します。
 * @param {*} props
 * @returns
 */
export function ContextProvider(props) {
  /** グローバルstate */
  const [state, setState] = useState({
    slackUserName: "",
    slackChannelName: "",
    slackAccessToken: "",
  });

  return (
    <Context.Provider value={[state, setState]}>
      {props.children}
    </Context.Provider>
  );
}
