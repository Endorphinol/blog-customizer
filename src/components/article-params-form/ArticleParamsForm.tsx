import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { useState } from 'react';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontSizeOptions,
	fontColors,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const [appliedState, setAppliedState] = useState(defaultArticleState);

	const handleMouseEvent = () => {
		setIsOpen((prev) => !prev);
	};

	const updateCSSVariables = (state) => {
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

	  const handleApply = () => {
		setAppliedState(formState);
		updateCSSVariables(formState);
		setIsOpen(false);
	  };
	
	  const handleReset = () => {
		setFormState(defaultArticleState);
		updateCSSVariables(defaultArticleState);
		setAppliedState(defaultArticleState);
	  };
	

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleMouseEvent} />
			{isOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}
					data-testid='params-form'>
					<form className={styles.form}>
						<Text
							as={'h2'}
							size={31}
							weight={800}
							fontStyle='normal'
							uppercase={true}
							align='left'
							family='open-sans'>
							Задайте параметры
						</Text>

						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) =>
								setFormState({ ...formState, fontFamilyOption: option })
							}
						/>
						<RadioGroup
							name='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) =>
								setFormState({ ...formState, fontSizeOption: option })
							}
							title='Размер шрифта'></RadioGroup>

						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) =>
								setFormState({ ...formState, fontColor: option })
							}
						/>

						<Separator />
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(option) =>
								setFormState({ ...formState, backgroundColor: option })
							}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(option) =>
								setFormState({ ...formState, contentWidth: option })
							}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleReset}
							/>
							<Button
								title='Применить'
								htmlType='submit'
								type='apply'
								onClick={handleApply}
							/>
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
