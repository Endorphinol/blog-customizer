import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { useRef, useState } from 'react';
import { Separator } from 'src/ui/separator';
import { useOverlayClick } from 'src/ui/article-params-form/hooks/useOverlayClick'
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

export const ArticleParamsForm = ({
	appliedState,
	onApply,
}: {
	appliedState: typeof defaultArticleState;
	onApply: (state: typeof defaultArticleState) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const asideRef = useRef<HTMLDivElement>(null);

	const handleMouseEvent = () => {
		setIsOpen((prev) => !prev);
	};

	const handleApply = () => {
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	useOverlayClick(asideRef, () => {
		if (isOpen) setIsOpen(false);
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleMouseEvent} />
			{isOpen && (
				<aside
					ref={asideRef}
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
