import jsonref
from pathlib import Path
import json

schema_directory = Path("./schemas")
object_to_extract = "InternalConfig"
output_path = Path("./InternalConfigSchema.json")


def concatenate_schema():
    concatenated_definitions = {"definitions": {}}

    for child in schema_directory.iterdir():
        if child.is_file():
            referenced_schema_json = json.loads(child.read_text())
            object_type = list(referenced_schema_json["definitions"].keys())[0]
            object_definition = referenced_schema_json["definitions"][object_type]
            concatenated_definitions["definitions"][object_type] = object_definition

    return json.dumps(concatenated_definitions)


def extract(object_to_extract, dereferenced_schema_json):
    extracted_json = dereferenced_schema_json["definitions"][object_to_extract]
    return extracted_json


concatenated_schema = concatenate_schema()

# Remove package definitions for compatibility reasons.
concatenated_schema = concatenated_schema.replace("evalquiz.", "")

dereferenced_schema_json = jsonref.loads(concatenated_schema)
extracted_json = extract(object_to_extract, dereferenced_schema_json)

with open(output_path, "w") as file:
    json.dump(extracted_json, file)
