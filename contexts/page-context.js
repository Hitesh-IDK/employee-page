import { createContext, useState } from "react"

const PageContext = createContext({
    pageId: null,
    setPageContext: function () { }
})

export default PageContext;

export function PageContextProvider(props) {
    const [pageId, setPageId] = useState();

    const setPageContext = (pageId) => {
        setPageId(pageId);
    }

    const context = {
        pageId,
        setPageContext
    }

    return <PageContext.Provider value={context} >
        {props.children}
    </ PageContext.Provider >
}