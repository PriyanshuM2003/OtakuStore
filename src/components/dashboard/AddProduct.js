import React, { useState } from 'react'
import {
    Stack,
    TextField,
    Radio,
    FormGroup,
    FormControlLabel,
    FormLabel,
    Button,
    Chip,
    Box,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const AddProduct = () => {
    const [form, setForm] = useState({
        category: {},
        size: { 'Standard': true },
        color: { 'Standard': true },
        title: '',
        tags: '',
        slug: '',
        desc: '',
        img: '',
        price: '',
        availableQty: '',
        tags: [],
        newTag: '',
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
        } else if (name.startsWith("size-")) {
            const sizeKey = name.replace("size-", "");
            if (checked) {
                setForm((prevForm) => ({
                    ...prevForm,
                    size: { [sizeKey]: true },
                }));
            } else {
                setForm((prevForm) => ({
                    ...prevForm,
                    size: {},
                }));
            }
        } else if (name.startsWith("color-")) {
            const colorKey = name.replace("color-", "");
            if (checked) {
                setForm((prevForm) => ({
                    ...prevForm,
                    color: { [colorKey]: true },
                }));
            } else {
                setForm((prevForm) => ({
                    ...prevForm,
                    color: {},
                }));
            }
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: checked,
            }));
        }

        if (name === 'tags') {
            setForm((prevForm) => ({
                ...prevForm,
                newTag: '',
                tags: event.target.value
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag !== '')
            }));
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };

    const handleTagDelete = (tagToDelete) => () => {
        setForm((prevForm) => ({
            ...prevForm,
            tags: prevForm.tags.filter((tag) => tag !== tagToDelete),
        }));
    };

    const handleTagAdd = (event) => {
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
            setForm((prevForm) => ({
                ...prevForm,
                tags: [...prevForm.tags, event.target.value.trim()],
            }));
            event.target.value = '';
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
                size: Object.keys(form.size).filter((key) => form.size[key]),
                color: Object.keys(form.color).filter((key) => form.color[key]),
            };

            formData.category = formData.category.join(',');
            formData.size = formData.size.join(',');
            formData.color = formData.color.join(',');


            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
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
                    <TextField
                        name="title"
                        label="Title"
                        variant="outlined"
                        value={form.title}
                        onChange={handleInputChange}
                    />
                    <FormLabel
                        htmlFor="size">Size</FormLabel>
                    <FormGroup className='flex flex-row justify-start items-center'>
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.size['S']}
                                name="size-S"
                                value="S"
                                onChange={handleChange}
                            />
                            }
                            label="S"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.size['M']}
                                name="size-M"
                                value="M"
                                onChange={handleChange}
                            />
                            }
                            label="M"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.size['L']}
                                name="size-L"
                                value="L"
                                onChange={handleChange}
                            />
                            }
                            label="L"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.size['XL']}
                                name="size-XL"
                                value="XL"
                                onChange={handleChange}
                            />
                            }
                            label="XL"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.size['XXL']}
                                name="size-XXL"
                                value="XXL"
                                onChange={handleChange}
                            />
                            }
                            label="XXL"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.size['single bed']}
                                name="size-single bed"
                                value="single bed"
                                onChange={handleChange}
                            />
                            }
                            label="Single-Bed"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.size['double bed']}
                                name="size-double bed"
                                value="double bed"
                                onChange={handleChange}
                            />
                            }
                            label="Double-Bed"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.size['Standard']}
                                name="size-Standard"
                                value="Standard"
                                onChange={handleChange}
                            />
                            }
                            label="Standard"
                        />
                    </FormGroup>
                    <FormLabel htmlFor="color">Color</FormLabel>
                    <FormGroup className='flex flex-row justify-start items-center'>
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.color['red']}
                                name="color-red"
                                value="red"
                                onChange={handleChange}
                            />
                            }
                            label="Red"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.color['blue']}
                                name="color-blue"
                                value="blue"
                                onChange={handleChange}
                            />
                            }
                            label="Blue"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.color['yellow']}
                                name="color-yellow"
                                value="yellow"
                                onChange={handleChange}
                            />
                            }
                            label="Yellow"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.color['green']}
                                name="color-green"
                                value="green"
                                onChange={handleChange}
                            />
                            }
                            label="Green"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.color['white']}
                                name="color-white"
                                value="white"
                                onChange={handleChange}
                            />
                            }
                            label="White"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.color['black']}
                                name="color-black"
                                value="black"
                                onChange={handleChange}
                            />
                            }
                            label="Black"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.color['orange']}
                                name="color-orange"
                                value="orange"
                                onChange={handleChange}
                            />
                            }
                            label="Orange"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.color['pink']}
                                name="color-pink"
                                value="pink"
                                onChange={handleChange}
                            />
                            }
                            label="Pink"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.color['purple']}
                                name="color-purple"
                                value="purple"
                                onChange={handleChange}
                            />
                            }
                            label="Purple"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.color['brown']}
                                name="color-brown"
                                value="brown"
                                onChange={handleChange}
                            />
                            }
                            label="Brown"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.color['gray']}
                                name="color-gray"
                                value="gray"
                                onChange={handleChange}
                            />
                            }
                            label="Gray"
                        />
                        <FormControlLabel
                            control={<Radio
                                checked={!!form.color['Standard']}
                                name="color-Standard"
                                value="Standard"
                                onChange={handleChange}
                            />
                            }
                            label="Standard"
                        />
                    </FormGroup>
                    <TextField value={form.img}
                        onChange={handleInputChange} name="img" label="Image URL" variant="outlined" />
                    <TextField
                        value={form.newTag}
                        onChange={handleChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && event.target.value.trim() !== '') {
                                setForm((prevForm) => ({
                                    ...prevForm,
                                    newTag: '',
                                    tags: [...prevForm.tags, event.target.value.trim()],
                                }));
                            }
                        }}
                        name="newTag"
                        label="Add Tags"
                        variant="outlined"
                        helperText="Press Enter to add a tag"
                    />
                    <Box>
                        {form.tags.map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                onDelete={handleTagDelete(tag)}
                                variant="outlined"
                                color="primary"
                                style={{ marginRight: '4px', marginBottom:'4px' }}
                            />
                        ))}
                    </Box>
                    <TextField value={form.slug}
                        onChange={handleInputChange} name="slug" label="Slug" variant="outlined" />
                    <TextField
                        name="desc"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={form.desc}
                        onChange={handleInputChange}
                    />
                    <div className='flex justify-start space-x-4 items-center'>
                        <TextField
                            name="price"
                            label="Price"
                            variant="outlined"
                            value={form.price}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="availableQty"
                            label="Quantity"
                            variant="outlined"
                            style={{ marginLeft: '8px' }}
                            value={form.availableQty}
                            onChange={handleInputChange}
                        />
                    </div>
                </Stack>
                <br />
                <Button
                    onClick={submitForm}
                    scrollToTop
                    variant="outlined"
                    mt={2}
                >
                    Add
                </Button>
            </BaseCard>
        </>
    )
}

export default AddProduct;