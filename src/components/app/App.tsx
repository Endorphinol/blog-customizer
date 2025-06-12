import { useState, useEffect } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';
import styles from 'src/styles/index.module.scss';

export const App = () => {
  const [articleState, setArticleState] = useState(defaultArticleState);

  const updateCSSVariables = (state: typeof defaultArticleState) => {
    document.documentElement.style.setProperty(
      '--font-family',
      state.fontFamilyOption.value
    );
    document.documentElement.style.setProperty(
      '--font-size',
      state.fontSizeOption.value
    );
    document.documentElement.style.setProperty(
      '--font-color',
      state.fontColor.value
    );
    document.documentElement.style.setProperty(
      '--container-width',
      state.contentWidth.value
    );
    document.documentElement.style.setProperty(
      '--bg-color',
      state.backgroundColor.value
    );
  };

  useEffect(() => {
    updateCSSVariables(articleState);
  }, [articleState]);

  return (
    <main className={styles.main}>
      <ArticleParamsForm 
        appliedState={articleState} 
        onApply={setArticleState} 
      />
      <Article />
    </main>
  );
};