import React, { useState } from 'react'
import {
    Stack,
    TextField,
    Radio,
    FormGroup,
    FormControlLabel,
    FormLabel,
    Button,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const createEmotionCache = () => {
    return createCache({ key: 'css', prepend: true });
};

const cache = createEmotionCache();

const AddImage = () => {
    const [form, setForm] = useState({
        category: {},
        img: '',
    });

    const handleChange = (event) => {
        const { name, value, checked } = event.target;

        if (name.startsWith("category-")) {
            const categoryKey = name.replace("category-", "");
            if (checked) {
                setForm((prevForm) => ({
                    ...prevForm,
                    category: { [categoryKey]: true },
                }));
            } else {
                setForm((prevForm) => ({
                    ...prevForm,
                    category: {},
                }));
            }
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: checked,
            }));
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const selectedCategories = Object.keys(form.category).filter((key) => form.category[key]);
            if (selectedCategories.length === 0) {
                throw new Error('Please select at least one category.');
            }

            const formData = {
                ...form,
                category: selectedCategories,
            };

            formData.category = formData.category.join(',');;


            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addimages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([formData]),
            });

            if (!response.ok) {
                throw new Error('Failed to addProduct product.');
            }

            window.scrollTo({ top: 0 });
            window.location.reload();
        } catch (error) {
            console.error('Error addProducting product:', error);
        }
    };

    return (
        <CacheProvider value={cache}>
            <>
                <BaseCard title="Add Product">
                    <Stack spacing={3}>
                        <FormLabel htmlFor="category">Category</FormLabel>
                        <FormGroup className='flex flex-row justify-start items-center'>
                            <FormControlLabel
                                control={<Radio
                                    checked={!!form.category['T-Shirt']}
                                    name="category-T-Shirt"
                                    value="T-Shirt"
                                    onChange={handleChange}
                                />
                                }
                                label="T-Shirt"
                            />
                            <FormControlLabel
                                control={<Radio
                                    checked={!!form.category['Action Figure']}
                                    name="category-Action Figure"
                                    value="Action Figure"
                                    onChange={handleChange}
                                />
                                }
                                label="Action Figure"
                            />
                            <FormControlLabel
                                control={<Radio
                                    checked={!!form.category['Costume']}
                                    name="category-Costume"
                                    value="Costume"
                                    onChange={handleChange}
                                />
                                }
                                label="Costume"
                            />
                            <FormControlLabel
                                control={<Radio
                                    checked={!!form.category['Replica']}
                                    name="category-Replica"
                                    value="Replica"
                                    onChange={handleChange}
                                />
                                }
                                label="Replica"
                            />
                            <FormControlLabel
                                control={<Radio
                                    checked={!!form.category['Pillow']}
                                    name="category-Pillow"
                                    value="Pillow"
                                    onChange={handleChange}
                                />
                                }
                                label="Pillow"
                            />
                            <FormControlLabel
                                control={<Radio
                                    checked={!!form.category['Bedsheet']}
                                    name="category-Bedsheet"
                                    value="Bedsheet"
                                    onChange={handleChange}
                                />
                                }
                                label="Bedsheet"
                            />
                            <FormControlLabel
                                control={<Radio
                                    checked={!!form.category['Sticker']}
                                    name="category-Sticker"
                                    value="Sticker"
                                    onChange={handleChange}
                                />
                                }
                                label="Sticker"
                            />
                            <FormControlLabel
                                control={<Radio
                                    checked={!!form.category['Poster']}
                                    name="category-Poster"
                                    value="Poster"
                                    onChange={handleChange}
                                />
                                }
                                label="Poster"
                            />
                        </FormGroup>
                        <TextField value={form.img}
                            onChange={handleInputChange} name="img" label="Image URL" variant="outlined" />
                    </Stack>
                    <br />
                    <Button
                        onClick={submitForm}
                        scrollToTop
                        variant="outlined"
                        mt={2}>
                        Upload
                    </Button>
                </BaseCard>
            </>
        </CacheProvider>
    )
}

export default AddImage;