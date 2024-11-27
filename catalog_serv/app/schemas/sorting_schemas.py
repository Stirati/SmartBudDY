from pydantic import BaseModel
from typing import Optional

class SortingInput(BaseModel):
    cpu_min: Optional[int]
    cpu_max: Optional[int]
    ram_min: Optional[int]
    ram_max: Optional[int]
    disk_min: Optional[int]
    disk_max: Optional[int]