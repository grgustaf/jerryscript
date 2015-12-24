/* Copyright 2015 Samsung Electronics Co., Ltd.
 * Copyright 2015 University of Szeged
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef LIT_LITERAL_STORAGE_H
#define LIT_LITERAL_STORAGE_H

#include "rcs-globals.h"
#include "ecma-globals.h"

extern record_set_t rcs_lit_storage;

record_type_t *create_charset_record (record_set_t *, const lit_utf8_byte_t *, lit_utf8_size_t);
record_type_t *create_magic_record (record_set_t *, lit_magic_string_id_t);
record_type_t *create_magic_record_ex (record_set_t *, lit_magic_string_ex_id_t);
record_type_t *create_number_record (record_set_t *, ecma_number_t);

uint32_t lit_count_literals (record_set_t *);
void lit_dump_literals (record_set_t *);

#endif
