from flask import Blueprint, render_template, redirect, url_for
# from ..forms import NewInstrument
from ..models import db #Artist

bp = Blueprint("artist", __name__, "")

@bp.route('/test')
def main_page():
    return render_template("main_page.html")